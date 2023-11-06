import express from "express";
import { sendError, sendServerError, sendSuccess} from "../helper/client.js";
//import models
import map from '../models/map.js';
import learnermap from '../models/learnermap.js';
import learnernode from '../models/learnernode.js'
import node from '../models/node.js';
import flashcard from '../models/flashcard.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const maps = await map.find();  
    return res.status(200).json({ data: maps });
  } catch (err) {
    return res.status(500).json({ message: JSON.stringify(err) });
  }
});


router.post('/add/', async (req, res) => {
  try {
      const { _id, name, mode, price, image } = req.body;
  
      const dbMap = new map({
        _id: _id, 
        name: name, 
        mode: mode, 
        price: price, 
        image:image
      })
  
      await dbMap.save();
      res.status(200).json({ message: "Create map successfully!" })
  } catch (err) {
    return res.status(500).json({ message: JSON.stringify(err) });
  }
});

//Learner: Show Map Selecting screen
router.get('/learner/:learnerid/:mode', async (req, res) => {
  try {
    const { learnerid, mode } = req.params;
    const maps = await map.find({mode: mode});    
    const data = await Promise.all(maps.map(async map => {
      const activemap = await learnermap.findOne({learnerId: learnerid, mapId: map._id});
      if (activemap){
        map._doc.active = true;
        map._doc.status = activemap.status;
      } else {
        map._doc.active = false;
        map._doc.status = 0;
      }
      return map;
    }));
    return res.status(200).json({ data: data });
  } catch (err) {
    return res.status(500).json({ message: JSON.stringify(err) });
  }
});

//Learner: Show chosen Map
router.get('/learn/:learnerid/:mapId', async (req, res) => {
  try {
    const { learnerid, mapId } = req.params;
    const nodes = await node.find({mapId: mapId});
    const data = await Promise.all(nodes.map(async node => {
      const activenode = await learnernode.findOne({learnerId: learnerid, nodeId: node._id});
      if (activenode){
        node._doc.active = true;
        node._doc.point = activenode.point;
      } else {
        node._doc.active = false;
        node._doc.status = 0;
      }
      return node;
    }));
    return res.status(200).json({ data: data });
  } catch (err) {
    return res.status(500).json({ message: JSON.stringify(err) });
  }
});

//Learner: Unlock Map
router.post('/unlock/:learnerid/:mapId', async (req, res) => {
  const {learnerid, mapId} = req.params;
  try {
      const isUnlocked = await map.exists({learnerid, mapId});
      if (isUnlocked) 
        return sendError(res, "Already unlocked!");
      const unlockedmap = await learnermap.create({learnerId: learnerid, mapId: mapId, status: 0});
      const node1st = await node.find({mapId: mapId, position: 1});
      const unlockednode = await learnernode.create({learnerId: learnerid, nodeId: node1st._id});
      console.log(unlockedmap);
      console.log(unlockednode);
      return sendSuccess(res, "Unlock successfully");
  } catch (error) {
      console.log(error);
      return sendServerError(res);   
  }
});

//Learner: Get unlock Map conditions
router.get('/lock/:learnerid/:mapId', async (req, res) => {
  const {learnerid, mapId} = req.params;
  try {
      const lockedmap = await map.findById(mapId);
      console.log(learnerid);
      const previousmap = await learnermap.find({learnerId: learnerid, mapId: lockedmap.previousmap});
      console.log(previousmap);
      console.log(previousmap[0].mapId);
      console.log(previousmap[0].status);
      let isFree = true;
      let condition = "";
      if (previousmap[0].status<=1)
        condition = 'Hoàn thành map '+previousmap[0].name+' từ 2* trở lên để mở khoá';
      else {
        if (lockedmap.price>0){
          isFree = lockedmap.price;
          condition = 'Dùng '+lockedmap.price+' đậu để mở khoá';
        }
        else return res.status(200).json({ action: "Mở map" });
      }
      return res.status(200).json({ isFree: isFree, condition: condition });
  } catch (error) {
      return res.status(500).json({ message: JSON.stringify(error) });
  }
});

//Admin: Show Map information
router.get('/:mode/topic/:name', async (req, res) => {
  try {
    const { mode, name } = req.params;
    const map0 = await map.findOne({ mode: mode, name: name });
    const nodes = await node.find({ mapId: map0._id });
    const data = await Promise.all(nodes.map(async node => {
      const flashcards = await flashcard.find({ nodeId: node._id });
      node._doc.flashcards = [];
      for (card in flashcards){
        node._doc.flashcards.push(card._id)
      }
      return node;
    }));
    return res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
});

//Admin: Show Node information
router.get('/node/:nodeId', async (req, res) => {
  try {
    const { nodeId } = req.params;
    const node0 = await node.findById(nodeId);
    if(node0){
      return res.status(200).json({ data: data });
    } else {
      return res.status(500).json({ message: "Cannot find node with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
});

//Admin: Update Node in chosen Map
router.put('/update-node/:nodeId', async (req, res) => {
  try {
    const { nodeId } = req.params;
    const { position, type } = req.body;

    // Save Node
    await node.findByIdAndUpdate(nodeId, { position: position, type: type });

    res.status(200).json({ message: "Update node successfully!" })
  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
});

//Admin: Update Flashcard in a Node
router.put('/update-card/:flcId', async (req, res) => {
  try {
    const { flcId } = req.params;
    const { nodeId } = req.body;

    // Save Flashcard
    await flashcard.findByIdAndUpdate(flcId, { nodeId: nodeId });

    res.status(200).json({ message: "Update flashcard successfully!" })
  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
});

//Admin: Delete Map
router.delete('/delete-map/:mode/topic/:name', async (req, res) => {
  try {
    const { mode, name } = req.params;
    const map0 = await map.findOne({ mode: mode, name: name });
    const nodes = await node.find({ mapId: map0._id });
    await Promise.all(nodes.map(async node => {
      await flashcard.updateMany({ nodeId: node._id }, {nodeId: None});
    }));
    await node.deleteMany({ mapId: map0._id });
    await map.findByIdAndRemove(map0._id);
    res.status(200).json({ message: "Delete map successfully!" })

  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
});

//Learner: Update Node Point
router.put('/node-result/:nodeId', async (req, res) => {
  try {
    const { nodeId } = req.params;
    const { learnerId, point, totalnumofquiz } = req.body;
    const node_result = learnernode.findOne({nodeId: nodeId, learnerId: learnerId});
    if (point> node_result.point)
      await learnernode.findByIdAndUpdate( node_result._id, { point: point, totalnumofquiz: totalnumofquiz });

    res.status(200).json({ message: "Update Node result successfully!" })
  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
});

//Learner: Unlock new Node
router.post('/node/:nodeId', async (req, res) => {
  try {
    const { nodeId } = req.params;
    const {learnerId} = req.body;
    const cur_node = await node.findById(nodeId);
    if(cur_node.next){
      const next_node = learnernode.findOne({nodeId : cur_node.next})
      if (!next_node){
        const dbLearnerNode = new learnernode({
          learnerId: learnerId,
          nodeId: cur_node.next
        })
        await dbLearnerNode.save();
      }
      return res.status(200).json({ message: "Unlock new Node successfully!" });
    } else {
      return res.status(500).json({ message: "Cannot find node with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
});

//Learner: Check Node State
router.get('/check-node/:mapId/:learnerId', async (req, res) => {
  try {
    const {mapId, learnerId} = req.params;
    const nodes = await node.find({mapId: mapId});
    let ret = [];
    for (let i in nodes){
      let nodestate = await learnernode.findOne({learnerId: learnerId, nodeId: nodes[i]._id});
      ret.push(nodestate? "Unlock" : "Lock");
      if (i>=1 && ret[i-1] == "Unlock" && ret[i] == "Lock") ret[i]="Next";
    }
    return res.status(200).json({ data: ret });
  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
})

//Learner: Get Summary of Map
router.get('/sum/:mapId/:learnerId', async (req,res) => {
  try {
    const {mapId, learnerId} = req.params;
    const nodes = await node.find({mapId: mapId});
    let learnernoderesults = [];
    let sumpoint = 0;
    let sumtotalnumofquiz = 0;
    for (let i in nodes){
      let newLearnerNode = await learnernode.findOne({nodeId: nodes[i].nodeId, learnerId: learnerId});
      learnernoderesults.push({point: newLearnerNode.point, totalnumofquiz: newLearnerNode.totalnumofquiz});
      sumpoint = sumpoint + newLearnerNode.point;
      sumtotalnumofquiz = sumtotalnumofquiz + newLearnerNode.totalnumofquiz;
    }
    learnernoderesults.push({point: sumpoint, totalnumofquiz: sumtotalnumofquiz});
    return res.status(200).json({ data: learnernoderesults });
  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
})

export default router;