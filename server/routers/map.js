import express from "express";
const router = express.Router();
const map = require('../models/map');
const learnermap = require('../models/learnermap');
const node = require('../models/node');
const flashcard = require('../models/flashcard');

//require("dotenv").config();

//Learner: Show Map Selecting screen
router.get('map/learner/:learnerid/:mode', async (req, res) => {
  try {
    const { learnerid, mode } = req.params;
    const maps = await map.find({mode: mode});    
    const data = await Promise.all(maps.map(async map => {
      const activemap = await learnermap.find({learnerId: learnerid, mapId: map._id});
      if (activemap){
        map._doc.active = true;
      } else {
        map._doc.active = false;
      }
      return map;
    }));
    return res.status(200).json({ data: data });
  } catch (err) {
    return res.status(500).json({ message: JSON.stringify(err) });
  }
});

//Learner: Show chosen Map
router.get('map/learner/:mapId', async (req, res) => {
  try {
    const { mapId } = req.params;
    const nodes = await node.find({mapId: mapId});
    if (nodes) {
      return res.status(200).json({ data: nodes });
    } else {
      return res.status(500).json({ message: "Cannot find map with given id" })
    }
  } catch (err) {
    return res.status(500).json({ message: JSON.stringify(err) });
  }
});


//Admin: Show Map information
router.get('/map/:mode/topic/:name', async (req, res) => {
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

module.exports = router;