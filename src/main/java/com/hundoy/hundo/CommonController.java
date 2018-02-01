package com.hundoy.hundo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/api")
public class CommonController
{
    @RequestMapping(value = "/aaa", method = RequestMethod.GET)
    public String index()
    {
        return "index";
    }

    @RequestMapping(value = "/getauth", method = RequestMethod.GET)
    @ResponseBody
    public String getauth()
    {
        return "getauth";
    }

    @RequestMapping(value = "/cancelauth", method = RequestMethod.GET)
    @ResponseBody
    public String cancelauth()
    {
        return "cancelauth";
    }
}