package com.Mountain_Mirage_Hotel.service;

import com.Mountain_Mirage_Hotel.exception.OurException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
public class AwsS3Service {

    private final String bucketName = "mountain-hotel-bucket-images";

    @Value("{aws.s3.access.key}")
    private String awsS3AccessKey;

    @Value("{aws.s3.secrete.key}")
    private String awsS3SecretKey;


    public String saveImageToS3(MultipartFile photo) {
        String s3LocationImage = null;

        try
        {
            String s3FileName = photo.getOriginalFilename();
            BasicAWSCredentials awsCredentials = new BasicAWSCredentials(awsS3AccessKey, awsS3SecretKey);
            AmazonS3 amazonS3 = AmazonS3ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                    .withRegion(Regions.US_EAST_1).build();

            InputStream inputStream = photo.getInputStream();

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType("image/jpeg");

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, s3FileName, inputStream, metadata);
            amazonS3.putObject(putObjectRequest);
            return "https://"+ bucketName + ".s3.amazonaws.com/" + s3FileName;

        }catch (Exception ex) {
            ex.printStackTrace();
            throw new OurException("Unable to save image to s3 bucket")
        }
    }

}
