package com.blog.BlogAppWS.Annotations;

import javax.validation.Constraint;
import javax.validation.Payload;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ FIELD })
@Retention(RUNTIME)
@Constraint(validatedBy = { UniqueEmailValidator.class})
public @interface UniqueEmail {
    String message() default "{blog.constraints.email.unique.message}";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}
