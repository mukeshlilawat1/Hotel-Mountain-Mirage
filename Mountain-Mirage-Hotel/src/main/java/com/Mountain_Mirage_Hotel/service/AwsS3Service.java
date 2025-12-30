package com.Mountain_Mirage_Hotel.service;

import com.Mountain_Mirage_Hotel.exception.OurException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
public class AwsS3Service {

    @Value("${aws.s3.bucket-name:mountain-hotel-bucket-images}")
    private String bucketName;

    @Value("${aws.s3.access.key}")
    private String awsS3AccessKey;

    @Value("${aws.s3.secret.key}")
    private String awsS3SecretKey;

    @Value("${aws.s3.region}")
    private String region;

    public void init() {
        AmazonS3 amazonS3 = AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .build(); // automatically reads AWS_* env vars
    }

    public String saveImageToS3(MultipartFile photo) {

        try (InputStream inputStream = photo.getInputStream()) {

            BasicAWSCredentials awsCredentials =
                    new BasicAWSCredentials(awsS3AccessKey, awsS3SecretKey);

            AmazonS3 amazonS3 = AmazonS3ClientBuilder.standard()
                    .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                    .withRegion(region)
                    .build();

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(photo.getSize());
            metadata.setContentType(photo.getContentType());

            String fileName = System.currentTimeMillis() + "_" + photo.getOriginalFilename();

            amazonS3.putObject(
                    new PutObjectRequest(bucketName, fileName, inputStream, metadata)
            );

            return "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + fileName;

        } catch (Exception ex) {
            ex.printStackTrace();
            throw new OurException("Unable to save image to S3");
        }
    }
}
