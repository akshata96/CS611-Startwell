/* Categorie creation */

INSERT INTO StartwellDB.SCategories 
(CategoryID,BucketType,CatDesc) VALUES 
('MockProvider','Provider','Mock Survey For Provider');

/* Survey Creation */

INSERT INTO StartwellDB.Surveys 
(SurveyTitle,CategoryID,BucketType) VALUES
('ProviderMockMatch','MockProvider','Provider');

/* Questions */

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('57','1','Session duration:','R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('57','2','Past Vs Present:','R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('57','3','Focus on feeling:','R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('57','4','Emotional Intensity:','R','30');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('57','5','Warm Vs Challenging:','R','30');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('57','6','What modality of therapy do you offer:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('57','7','How many sessions do you offer in a therapy:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('57','8','Do you Suggest self help books, apps or podcasts:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('57','9','Do you Suggest support groups:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('57','10','Do you offer telehealth Services:','R','25');

/* Options */

/* Session Duration */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','1','1','Long term');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','1','2','Short term');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','1','3','No Preference');

/* Past */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','2','1','Past Preference');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','2','2','Present Preference');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','2','3','No Preference');

/* Feelings */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','3','1','I do not focus on feelings');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','3','2','I focus on feelings');

/* Emotional Intensity */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','4','1','Strong Preference for Emotional intensity');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','4','2','Strong Preference for Emotionally reserved');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','4','3','NO preference');


/* Warm Vs Challenging */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','5','1','Strong Warm and Supportive Preference');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','5','2','Strong Focus and Challenging Preference ');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','5','3','No Preference');


/* Modulaty */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','6','1','Individual');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','6','2','Couples');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','6','3','Family');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','6','4','Group');

/*  how many Sessions */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','7','1','Short term');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','7','2','Long term');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','7','3','Open Ended');

/* Self Help */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','8','1','Yes');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','8','2','No');

/* support group */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','9','1','Yes');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','9','2','No');


/* Tele health */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','10','1','I’d prefer it in person');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','10','2','I`d prefer Online');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('57','10','3','Both');
