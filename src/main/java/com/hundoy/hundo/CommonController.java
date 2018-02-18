package com.hundoy.hundo;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.hundoy.hundo.bean.StConfig;
import com.hundoy.hundo.mapper.DataMapper;
import com.hundoy.hundo.util.DataUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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

    @RequestMapping(value = "/getDetail", method = RequestMethod.GET, produces={"text/html;charset=UTF-8;","application/json;"})
    @ResponseBody
    public String getDetail(@RequestParam String uid)
    {
        JSONObject rsdata = new JSONObject();
        try{
            List<Map<String,Object>> kuserList = dataMapper.getKuser(Long.parseLong(uid));
            if (kuserList.size()==0) return "nodata";
            Map<String,Object> kuser = kuserList.get(0);
            rsdata.put("uid", kuser.get("uid").toString());
            rsdata.put("name", kuser.get("nick_name").toString());

            Map<String,Object> pieSum = dataMapper.getPieSum(Long.parseLong(uid)).get(0);
            if (pieSum==null) return "nodata";
            List<Map<String,Object>> ccnt = dataMapper.getTypeCnt(Long.parseLong(uid), "comment");
            List<Map<String,Object>> rcnt = dataMapper.getTypeCnt(Long.parseLong(uid), "repost");
            List<Map<String,Object>> lcnt = dataMapper.getTypeCnt(Long.parseLong(uid), "like");
            List<Map<String,Object>> tscore = dataMapper.getTotalScore(Long.parseLong(uid));
            long csum = Long.parseLong(pieSum.get("c_cnt").toString());
            long rsum = Long.parseLong(pieSum.get("r_cnt").toString());
            long lsum = Long.parseLong(pieSum.get("l_cnt").toString());

            JSONArray carr = new JSONArray(); // 评论饼
            JSONArray rarr = new JSONArray(); // 转发饼
            JSONArray larr = new JSONArray(); // 点赞饼
            JSONArray tarr = new JSONArray(); // 综合饼
            JSONArray legend = new JSONArray();
            addCntData(ccnt, carr, csum, legend);
            addCntData(rcnt, rarr, rsum, legend);
            addCntData(lcnt, larr, lsum, legend);
            addTotalData(tscore, tarr, legend);

            legend.add("其他");

            rsdata.put("comment", carr);
            rsdata.put("repost", rarr);
            rsdata.put("like", larr);
            rsdata.put("total", tarr);
            rsdata.put("legend", legend);
        } catch (Exception e){
            e.printStackTrace();
            return (new JSONObject()).toJSONString();
        }
        return rsdata.toJSONString();
    }

    private void addTotalData(List<Map<String, Object>> tscore, JSONArray tarr, JSONArray legend) {
        for (Map<String, Object> data : tscore){
            String guestUid = data.get("uid").toString();
            String guestName = data.get("nick_name").toString();
            long score = Long.valueOf(data.get("score").toString());
            JSONObject json = new JSONObject();
            json.put("uid", guestUid);
            json.put("name", guestName);
            json.put("score", score);
            tarr.add(json);

            if (!legend.contains(guestName)){
                legend.add(guestName);
            }
        }
    }

    private void addCntData(List<Map<String, Object>> ccnt, JSONArray carr, long sum, JSONArray legend) {
        long top9Sum = 0L;
        for (Map<String,Object> data: ccnt){
            String guestUid = data.get("uid").toString();
            String guestName = data.get("nick_name").toString();
            long cnt = Long.valueOf(data.get("cnt").toString());
            JSONObject json = new JSONObject();
            json.put("uid", guestUid);
            json.put("name", guestName);
            json.put("cnt", cnt);
            carr.add(json);

            top9Sum+=cnt;

            if (!legend.contains(guestName)){
                legend.add(guestName);
            }
        }

        // others
        String otherName = "其他";
        JSONObject json = new JSONObject();
        json.put("uid", "-1");
        json.put("name", otherName);
        json.put("cnt", sum-top9Sum);
        carr.add(json);
    }


    @RequestMapping(value = "/getScoreData", method = RequestMethod.GET, produces={"text/html;charset=UTF-8;","application/json;"})
    @ResponseBody
    public String getScoreData(@RequestParam int level)
    {
        String[] configs = dataMapper.getConfig("score_st").split(";");
        if (level<0 || level>configs.length-1) level = 0;
        StConfig stConfig = DataUtil.prepareConfig(configs[level]);

        List<Map<String,Object>> scoreDatas = dataMapper.getScoreData(stConfig.minScore);
        JSONObject nodeMap = new JSONObject();
        JSONArray nodes = new JSONArray();
        JSONArray links = new JSONArray();
        for (Map<String,Object> scoreData : scoreDatas){
            String node1 = String.valueOf(scoreData.get("node1"));
            String node2 = String.valueOf(scoreData.get("node2"));
            String name1 = (String)scoreData.get("name1");
            String name2 = (String)scoreData.get("name2");
            long score = (Long)scoreData.get("score");
            double strengthd = 0.01;
            strengthd = DataUtil.calStrength(stConfig, score);
//            if (score>=50){
//                strengthd = 1.0;
//            } else if (score>=40){
//                strengthd = 0.5;
//            } else if (score>=20){
//                strengthd = 0.2;
//            } else if (score>=15){
//                strengthd = 0.05;
//            }
//            double strengthd = 0.01385 * score - 0.1077;

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