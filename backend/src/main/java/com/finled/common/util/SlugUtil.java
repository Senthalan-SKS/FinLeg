package com.finled.common.util;

public class SlugUtil {

    public static String toSlug(String value) {
        return value
                .toLowerCase()
                .trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-");
    }
}