package com.hundoy.hundo;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.hundoy.hundo.mapper.DataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api")
public class CommonController
{
    @Autowired
    private DataMapper dataMapper;

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

    @RequestMapping(value = "/uids", method = RequestMethod.GET)
    @ResponseBody
    public String uids()
    {
        List<Map<String,Long>> uidList = dataMapper.getAllUids();
        StringBuffer sb = new StringBuffer();
        for (Map<String,Long> uidMap: uidList){
            sb.append(uidMap.get("uid"));
        }
        return sb.toString();
    }

    @RequestMapping(value = "/getScoreData", method = RequestMethod.GET, produces={"text/html;charset=UTF-8;","application/json;"})
    @ResponseBody
    public String getScoreData()
    {
        List<Map<String,Object>> uidList = dataMapper.getScoreData();
        JSONArray arr = new JSONArray();
        for (Map<String,Object> uidMap : uidList){
            JSONObject data = JSONObject.parseObject(JSON.toJSONString(uidMap));
            arr.add(data);
        }
        return arr.toJSONString();
    }
}