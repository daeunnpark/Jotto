package com.white.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class WebRedirectController {
    // Not used but to test
    @RequestMapping(value = "/redirect", method = RequestMethod.GET)
    public String redirect() {
        return "redirect:/sample";
    }
    @RequestMapping(value = "/sample", method = RequestMethod.GET)
    public String history() {
        return "sample";
    }





}
