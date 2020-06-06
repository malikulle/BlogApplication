package com.blog.BlogAppWS.Annotations;

import com.blog.BlogAppWS.Services.FileService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class FileTypeValidator implements ConstraintValidator<FileType,String> {

    @Autowired
    private FileService fileService;

    String[] types;

    @Override
    public void initialize(FileType constraintAnnotation) {
        this.types = constraintAnnotation.types();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {

        if (value == null || value=="")
            return true;

        String fileType = fileService.detectType(value);

        for (String supportedTypes : this.types){
            if(fileType.equalsIgnoreCase("image/jpeg") || fileType.equalsIgnoreCase("image/png"))
                return true;
        }
        return false;
    }
}
