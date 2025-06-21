package com.MountainMirage.Hotel_Mountain_Mirage.Service;

import com.MountainMirage.Hotel_Mountain_Mirage.Exception.OurException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
public class AWSS3Service {

    private final String BucketName = "mountain-mirag-images";

    @Value("{aws.s3.access.key}")
    private String awsS3AccessKey;

    @Value("{aws.s3.secret.key}")
    private String awsS3SecretKey;


    public String saveImageToS3(MultipartFile photo) {
        String s3LocationImage = null;

        try {
            String s3FileName = photo.getOriginalFilename();
            BasicAWSCredentials basicAWSCredentials = new BasicAWSCredentials(awsS3AccessKey, awsS3SecretKey);
            AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                    .withCredentials(new AWSStaticCredentialsProvider(basicAWSCredentials))
                    .withRegion(Regions.AP_SOUTH_1)
                    .build();

            InputStream inputStream = photo.getInputStream();

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType("image/jpeg");

        }catch (Exception e) {
            e.printStackTrace();
            throw new OurException("unnable to upload image to s3 bucket");

        }
    }




}
