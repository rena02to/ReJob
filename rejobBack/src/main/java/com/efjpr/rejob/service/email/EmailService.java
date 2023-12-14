package com.efjpr.rejob.service.email;

import java.io.IOException;
import java.util.Map;

public interface EmailService {
    void sendSimpleMessage(String to,
                           String subject,
                           String text);
}