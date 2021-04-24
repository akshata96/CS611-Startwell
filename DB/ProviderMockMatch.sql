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

