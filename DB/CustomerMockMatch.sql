
/* Survey Creation */

INSERT INTO StartwellDB.Surveys 
(SurveyTitle,CategoryID,BucketType) VALUES
('CustomerMockMatch','Customer','Mock');

/* Questions */

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('56','1','Session duration:','R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('56','2','Past Vs Present:','R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('56','3','Focus on feeling:','R');

/* Options */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','1','1','Less than 30 mins');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','1','2','30 Mins to 1 Hour');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','1','3','1 hour to 3 Hours');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','1','4','More than 3 Hours ');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','1','5','One Whole Day');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','1','6','No Preference');

/* Past */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','2','1','I dont want to talk about my past');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','2','2','I want to talk about my past');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','2','3','I dont want to talk about my current situation');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','2','4','I want to talk about my current situation');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','2','5','I dont mind talking about both past and present');

/* Feelings */


INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','3','1','I want to keep talking about how I feel');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','3','2','I dont want to talk about how I feel');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','3','3','I do not know how I feel');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','3','4','I want to know how I feel'); 