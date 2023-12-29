import express from "express";
//import models
import learnerlrl from '../models/learnerlrl.js';
import lrl from '../models/lrl.js';
import lrquiz from '../models/lrquiz.js';
import lranswer from '../models/lranswer.js';
import learner from "../models/learner.js";

const router = express.Router();

//Admin: Add a lesson
router.post('/add-lesson/', async (req, res) => {
  try {
      const { name, image, description, audio, price, next } = req.body;
  
      const dbLesson = new lrl({
        name: name,
        image: image,
        description: description,
        audio: audio,
        price: price,
        next: next
      });
      await dbLesson.save();
      res.status(200).json({ message: "Create listening reading lesson successfully!" });
  } catch (err) {
    return res.status(500).json({ message: JSON.stringify(err) });
  }
});

//Admin: Edit a lesson
router.put('/edit-lesson/:lessonId', async (req, res) => {
    try {
        const {lessonId} = req.params;
        const { name, image, description, audio, price, next } = req.body;
    
        await lrl.findByIdAndUpdate( lessonId,{
          name: name,
          image: image,
          description: description,
          audio: audio,
          price: price,
          next: next
        });
        res.status(200).json({ message: "Update listening reading lesson successfully!" });
    } catch (err) {
      return res.status(500).json({ message: JSON.stringify(err) });
    }
  });

//Admin: Delete a lesson
router.delete('/delete-lesson/:lessonId', async (req, res) => {
    try {
        const {lessonId} = req.params;
        await lrl.findByIdAndDelete( lessonId );
        res.status(200).json({ message: "Delete listening reading lesson successfully!" });
    } catch (err) {
      return res.status(500).json({ message: JSON.stringify(err) });
    }
  });

//Admin: Add a quiz
router.post('/add-quiz/', async (req, res) => {
  try {
      const { question, lesson } = req.body;
  
      const dbQuiz = new lrquiz({
        question: question,
        lesson: lesson
      });
      await dbQuiz.save();
      res.status(200).json({ message: "Create listening reading quiz successfully!" });
  } catch (err) {
    return res.status(500).json({ message: JSON.stringify(err) });
  }
});

//Admin: Edit a quiz
router.put('/edit-quiz/:quizId', async (req, res) => {
    try {
        const {quizId} = req.params;
        const { question, lesson } = req.body;
    
        await lrquiz.findByIdAndUpdate( quizId,{
          question: question,
          lesson: lesson
        });
        res.status(200).json({ message: "Update listening reading quiz successfully!" });
    } catch (err) {
      return res.status(500).json({ message: JSON.stringify(err) });
    }
  });

//Admin: Delete a quiz
router.delete('/delete-quiz/:quizId', async (req, res) => {
    try {
        const {quizId} = req.params;
        await lrquiz.findByIdAndDelete( quizId );
        res.status(200).json({ message: "Delete listening reading quiz successfully!" });
    } catch (err) {
      return res.status(500).json({ message: JSON.stringify(err) });
    }
  });

//Admin: Add answer for pquiz
router.post('/create/answer/:quizId', async (req, res) => {
  const { quizId } = req.params;
  const { content, isCorrect } = req.body;
  try {
    const existedQuiz = await lrquiz.findById(quizId);
    if (!existedQuiz)
      return res.status(400).json({ message: "Quiz doesn't exist!" });

    const answer = await lranswer.create({ content: content, isCorrect: isCorrect, quizId: existedQuiz });
    return res.status(200).json({ message: "Create successfully", data: answer });
  } catch (err) {
    return res.status(500).json({ message: JSON.stringify(err) });  
  }
});

//Admin: Edit an answer
router.put('/edit/answer/:answerId', async (req, res) => {
  try {
      const {answerId} = req.params;
      const { content, isCorrect, quizId } = req.body;
  
      await lranswer.findByIdAndUpdate( answerId,{
        content: content, 
        isCorrect: isCorrect, 
        quizId: quizId
      });
      res.status(200).json({ message: "Update answer successfully!" });
  } catch (err) {
    return res.status(500).json({ message: JSON.stringify(err) });
  }
});

//Admin: Delete an answer
router.delete('/delete/answer/:answerId', async (req, res) => {
  try {
      const {answerId} = req.params;
      await lranswer.findByIdAndDelete( answerId );
      res.status(200).json({ message: "Delete answer successfully!" });
  } catch (err) {
    return res.status(500).json({ message: JSON.stringify(err) });
  }
});

//Admin: Get all lessons
router.get('/', async (req, res) => {
  try {
      const lessons = await lrl.find()
      return res.status(200).json({ lessons: lessons});
  } catch (err) {
    return res.status(500).json({ message: JSON.stringify(err) });
  }
});  

//Learner: Unlock the first lesson
router.post('/first-lesson/:learnerId', async (req, res) => {
  try {
      const { learnerId } = req.params;
      const flesson = await lrl.findOne();
      const isUnlocked = await learnerlrl.exists({learnerId: learnerId, lrlId: flesson});
      if (isUnlocked) 
        return res.status(200).json({ message: "Already unlocked!" });
      await learnerlrl.create({learnerId: learnerId, lrlId: flesson._id, status: 0});
      return res.status(200).json({ message: "Unlock lesson"+flesson.name});
  } catch (err) {
    return res.status(500).json({ message: JSON.stringify(err) });
  }
});  

//Learner: Get quizzes of a lesson
router.get('/quiz/:lessonId', async (req, res) => {
    try {
        const { lessonId } = req.params;
        const quizzes = await lrquiz.find({lesson: lessonId})
        return res.status(200).json({ quiz: quizzes});
    } catch (err) {
      return res.status(500).json({ message: JSON.stringify(err) });
    }
});  

//Learner: Get answers
router.get('/answer/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;
    const answers = await lranswer.find({quizId: quizId});   
    return res.status(200).json({ data: answers });
  } catch (err) {
    return res.status(500).json({ message: JSON.stringify(err) });
  }
});

//Learner: Get lesson
router.get('/:lessonId', async (req, res) => {
  try {
    const { lessonId } = req.params;
    const lesson = await lrl.findById(lessonId);
    return res.status(200).json({ data: lesson });
  } catch (err) {
    return res.status(500).json({ message: JSON.stringify(err) });
  }
});

//Learner: Get all lessons status
router.get('/learner/:learnerId', async (req, res) => {
    try {
        const { learnerId } = req.params;
        const alllessons = await lrl.find();
        const data = await Promise.all(alllessons.map(async lesson => {
        const activelesson = await learnerlrl.findOne({learnerId: learnerId, lrlId: lesson._id});
        if (activelesson){
            lesson._doc.active = true;
            lesson._doc.point = activelesson.point;
            lesson._doc.total = activelesson.total;
            lesson._doc.isDone = activelesson.point/activelesson.total>=0.5? true : false;
        } else {
            lesson._doc.active = false;
        }
        return lesson;
      }));
      return res.status(200).json({ data: data });
    } catch (err) {
      return res.status(500).json({ message: JSON.stringify(err) });
    }
  });

//Learner: Unlock Next Lesson
router.post('/:lessonId', async (req, res) => {
  const {lessonId} = req.params;
  const {learnerId} = req.body;
  try {
      const curLesson = await lrl.findById(lessonId);
      const isUnlocked = await learnerlrl.exists({learnerId: learnerId, lrlId: curLesson.next});
      if (isUnlocked) 
        return res.status(200).json({ message: "Already unlocked!" });
      const curLearner = await learner.findById(learnerId)
      var newHeart = curLearner.heart + num;
      await learner.findByIdAndUpdate(learnerId, {heart: newHeart})
      const unlockedlr = await learnerlrl.create({learnerId: learnerId, lrlId: lessonId, status: 0});
      return res.status(200).json({ data: unlockedlr });
  } catch (err) {
    return res.status(500).json({ message: JSON.stringify(err) });  
  }
});

//Learner: Send result
router.put('/result/:lessonId', async (req, res) => {
  const { lessonId } = req.params;
  const { learnerId, point, totalnumofquiz } = req.body;
  try {
    const result = await learnerlrl.findOne({lrlId: lessonId, learnerId: learnerId});
    if (point> result.point)
      await learnerlrl.findByIdAndUpdate( result._id, { point: point, total: totalnumofquiz });
    res.status(200).json({ message: "Update Node result successfully!" })
  } catch (error) {
      return res.status(500).json({ message: JSON.stringify(error) });
  }
});


export default router;