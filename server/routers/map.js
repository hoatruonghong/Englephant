import express from "express";
//import models
import map from '../models/map.js';
import learnermap from '../models/learnermap.js';
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

//Learner: Show all maps
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
      res.status(200).json({ message: "Create add successfully!" })
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
    const { mapId } = req.params;
    const nodes = await node.findById({mapId: mapId});
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

export default router;