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
import java.util.Set;

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
        List<Map<String,Object>> scoreDatas = dataMapper.getScoreData();
        JSONObject nodeMap = new JSONObject();
        JSONArray nodes = new JSONArray();
        JSONArray links = new JSONArray();
        for (Map<String,Object> scoreData : scoreDatas){
            String node1 = String.valueOf(scoreData.get("node1"));
            String node2 = String.valueOf(scoreData.get("node2"));
            String name1 = (String)scoreData.get("name1");
            String name2 = (String)scoreData.get("name2");
            long score = (Long)scoreData.get("score");
            double strengthd = 0.01385 * score - 0.1077;

            if (!nodeMap.containsKey(node1)){
                addNode(nodeMap, node1, name1);
                nodes.add(nodeMap.getJSONObject(node1));
            }

            if (!nodeMap.containsKey(node2)){
                addNode(nodeMap, node2, name2);
                nodes.add(nodeMap.getJSONObject(node2));
            }

            int sourceIndex = nodes.indexOf(nodeMap.getJSONObject(node1));
            int targetIndex = nodes.indexOf(nodeMap.getJSONObject(node2));

            JSONObject link = new JSONObject();
            link.put("source", sourceIndex);
            link.put("target", targetIndex);
            link.put("strengthd", strengthd);

            links.add(link);
        }

        JSONObject data = new JSONObject();
        data.put("nodes", nodes);
        data.put("links", links);

        return data.toJSONString();
    }

    private void addNode(JSONObject nodes, String node1, String name1) {
        JSONObject node = new JSONObject();
        node.put("name", name1);
        node.put("id", node1);
        nodes.put(node1, node);
    }
}