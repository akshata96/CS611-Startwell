/* Bucket Type */

INSERT INTO StartwellDB.UserBuckets (BucketType,BucketDesc) VALUES ('All','General to all Users');

/* Cateogry Type */

INSERT INTO StartwellDB.SCategories (CategoryID,BucketType,CatDesc) VALUES ('Review','All','Review asked to Users');

/* Survey */

INSERT INTO StartwellDB.Surveys 
(SurveyTitle,NoQues,OptDesc,CategoryID,SurveyStatus) VALUES
('Review','5','MCQ','Review','A');

/* Survey Questions */

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('1','1','Do you feel therapist a good match:','R','30');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('1','2','Would you continue theraphy:','R','30');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('1','3','Would you recomend startwell to your friend in need :','R','30');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('1','4','Your overall satisfaction with theraphy:','R','30');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('1','5','Your overall satisfaction with Startwell Application :','R','30');

/* Option Insertion */


/* therapist a good match */


INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','1','1','Great match');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','1','2','Good match');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','1','3','No, I am looking for a better match');

/* continue theraphy */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','2','1','Absolutely');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','2','2','Not sure');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','2','3','No');


/* Recommend Startwell */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','2','1','Absolutely');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','2','2','Not sure');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','2','3','No');

/* satisfaction with theraphy: */


INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','1','1','');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','1','2','');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','1','3','No, I am looking for a better match');



/*Modulatity*/

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','5','1','Individua');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','5','2','Couples');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','5','3','Family');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','5','4','Group');