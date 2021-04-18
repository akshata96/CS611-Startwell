/* Bucket Type */

INSERT INTO StartwellDB.UserBuckets (BucketType,BucketDesc) VALUES ('All','General to all Users');

/* Cateogry Type */

INSERT INTO StartwellDB.SCategories (CategoryID,BucketType,CatDesc) VALUES ('UserMicroPreferenceSurvey','All','MicroPreference survey asked to users for matching');

/* Survey */


INSERT INTO StartwellDB.Surveys 
(SurveyTitle,CategoryID,BucketType) VALUES
('Macropreference Survey','CustomerMacroSurvey','Customer');

/* Survey Questions */

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('3','1','I would like the therapist to:','R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('3','2','Give Structure to therapy:','R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('3','3','Teach me skills to deal with :','R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('3','4','HomeWork Preference':,'R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('3','5','Preference to take lead in therapy:','C');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('3','6','Handling emotions: ','R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('3','7','Are you interested in support groups:','R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('3','8','Therapy Relationship:','R');

NSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('3','9','Relationship between us:','R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('3','10',' Focus on feeling:','R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('3','11','Childhood Reflection:','R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('3','12','Express strong feeling:','R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('3','13','Gentle vs Challenging:','S');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('3','14','Supportive vs Confrontational:','S');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('3','15','Therapist directiveness:','R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('3','16','Past Vs Present:','R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('3','17','Warm Vs Challenging:','R');

/* Therapist Directiveness */
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","1","1","Strong Directive Preference");

INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","1","2","Strong Client Preference");

INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","1","3","NO Preference");

/* Emotional Intensity */

INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","2","1","Strong Preference for Emotional intensity");

INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","2","2","Strong Preference for Emotionally reserved");

INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","2","3","NO preference");


/* Past Vs. Present */

INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","3","1","Strong Past Preference");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","3","2","Strong Present Preference");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","3","3","No Preference");

/* Warm vs. Challenging */

INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","4","1","Strong Warm and Supportive Preference");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","4","2","Strong Focus and Challenging Preference ");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","4","3","No Preference");

/* Gender Prefernce */

INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","5","1","Male");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","5","2","Female");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","5","3","Transgender");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","5","4","No Preference");

/*  Racial Identity */

INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","6","1","Asian");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","6","2","African American");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","6","3","Hispanic or Latino");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","6","4","White");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","6","5","Others");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","6","6","No Preference");

/* Age Preference */

INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","7","1","Below 35");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","7","2","35 to 50");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","7","3","Above 50");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","7","4","No Preference");


/* Sexual Oreintation */

INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","8","1","Hetrosexual");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","8","2","Homosexula");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","8","3","Bisexual");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","8","4","No Preference");

/* Religion */

INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","9","1","Religious");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","9","2","Non-Religious");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","9","3","No Preference");
