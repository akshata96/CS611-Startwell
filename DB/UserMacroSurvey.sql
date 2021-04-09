/* Bucket Type */

INSERT INTO StartwellDB.UserBuckets (BucketType,BucketDesc) VALUES ('All','General to all Users');

/* Cateogry Type */

INSERT INTO StartwellDB.SCategories (CategoryID,BucketType,CatDesc) VALUES ('UserMacroSurvey','All','Macropreference survey asked to users for matching');

/* Survey */

INSERT INTO StartwellDB.Surveys 
(SurveyTitle,NoQues,OptDesc,CategoryID,SurveyStatus) VALUES
('User Macropreference Survey','12','MCQ','UserMacroSurvey','A');

/* Survey Questions */

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('1','1','Therapist directiveness:','R','30');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('1','2','Emotional Intensity:','R','30');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('1','3','Past Vs Present:','R','30');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('1','4','Warm Vs Challenging:','R','30');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('1','5','What modality of therapy would you prefer:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('1','6','How many sessions would you like to be in therapy:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('1','7','How long would you like your sessions to be','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('1','8','What orientation of therapy would you prefer:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('1','9','What are some of your concerns:','C','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('1','10','Are you interested in self help books, apps or podcasts regarding your concerns:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('1','11','Are you interested in support groups:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('1','12','Are you interested in telehealth:','R','25');

/*

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('1','13','Do you need support with housing or other resources apart from mental health:','R');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType) VALUES 
('1','14','What would you most dislike or despise happening in your therapy or counselling:','T');

*/

/* Option Insertion */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','1','1','Strong Directive Preference');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','1','2','Strong Client Preference');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','1','3','NO Preference');

/* Emotional Intensity */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','2','1','Strong Preference for Emotional intensity');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','2','2','Strong Preference for Emotionally reserved');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','2','3','NO preference');


/* Past Vs. Present */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','3','1','Strong Past Preference');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','3','2','Strong Present Preference');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','3','3','No Preference');

/* Warm vs. Challenging */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','4','1','Strong Warm and Supportive Preference');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','4','2','Strong Focus and Challenging Preference ');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','4','3','No Preference');



/*Modulatity*/

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','5','1','Individua');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','5','2','Couples');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','5','3','Family');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','5','4','Group');

/*  how many Sessions */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','6','1','5');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','6','2','12');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','6','3','20');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','6','4','Long term');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','6','5','Open Ended');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','6','6','I am Not Sure');

/* How long */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','7','1','15 minutes');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','7','2','30 minutes');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','7','3','45 minutes');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','7','4','60 minutes');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','7','5','I am Not Sure');



/* Orientation */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','8','1','I really don’t know');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','8','2','Cognitive / Cognitive-Behavioral');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','8','3','Psychodynamic');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','8','4','Person Centered');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','8','5','Other');

/* concern */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','1','Anxiety and stress');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','2','Depression and self-esteem');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','3','Relationships/lack thereof ');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','4','Habits and behaviors');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','5','Trouble getting through the day');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','6','Trouble being in the present moment');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','7','Substance use behaviors');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','8','Bipolar symptoms');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','9','OCD symptoms');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','10','Trauma or PTSD symptoms');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','11','ADD/ADHD symptoms ');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','12','Eating disorder symptoms');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','13','Grief symptoms');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','14','BPD symptoms ');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','15','Trouble with sex');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','16','Child/adolescent ');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','17','Family');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','9','18','Chronic Pain ');

/* Self help */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','10','1','Yes');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','10','2','No');

/* support group */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','11','1','Yes');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','11','2','No');


/* Tele health */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','12','1','Yes');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','12','2','QuesID of both in person and telehealth');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','12','3','I’d prefer it in person');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('1','12','4','No I only want in person');


/* Housing support 

INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","18","1","Yes");
INSERT INTO StartwellDB.QOptions (SurveyID,Combination,OptID,OptText) 
VALUES ("1","18","2","No");

*/






