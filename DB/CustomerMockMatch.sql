
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

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('56','4','Emotional Intensity:','R','30');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('56','5','Warm Vs Challenging:','R','30');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('56','6','What modality of therapy do you offer:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('56','7','How many sessions do you offer in a therapy:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('56','8','Do you Suggest self help books, apps or podcasts:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('56','9','Do you Suggest support groups:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('56','10','Do you offer telehealth Services:','R','25');

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

/* Emotional Intensity */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','4','1','I want a Emotionally Intense therapist');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','4','2','I am an Emotionally Intense Person');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','4','3','I am an Emotionally Reserved Person');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','4','4','I do not want my therapist to probe me too much');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','4','5','I want the therapist to decide');

/* Warm Vs Challenging */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','5','1','The Therapist should be supportive');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','5','2','The Therapist should be warm');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','5','3','Therapist should teach me to focus on goals');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','5','4','The therapist should give challenging task');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','5','5','The therapist should decide what is best for me');


/* Modulaty */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','6','1','I want to get therapy alone');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','6','2','I prefer talking in private');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','6','3','I prefer talking with my partner');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','6','4','I prefer talking when my whole family is there');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','6','5','I prefer Group therapy');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','6','6','I prefer therapy along with parents');


/*  how many Sessions */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','7','1','5 to 10 sessions');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','7','2','10 to 15 sessions');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','7','3','15 to 30 sessions');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','7','4','above 30');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','7','5','As Long as it needs');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','7','6','No preference');

/* Self Help */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','8','1','Self help books');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','8','2','Podcast');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','8','3','Apps');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','8','4','No');


/* support group */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','9','1','I like support groups');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','9','2','I prefer group');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','9','3','I do not prefer group support');


/* Tele health */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','10','1','I’d prefer it in person');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','10','2','I`d prefer Online');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','10','3','Mix of both');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('56','10','4','Therapist decide');
