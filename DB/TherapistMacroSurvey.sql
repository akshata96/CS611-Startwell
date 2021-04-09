/* Bucket Type */

INSERT INTO StartwellDB.UserBuckets (BucketType,BucketDesc) VALUES ('Therapist','General to all Therapist');

/* Cateogry Type */

INSERT INTO StartwellDB.SCategories (CategoryID,BucketType,CatDesc) VALUES ('TherapistMacroSurvey','Therapist','Macropreference survey asked to Therapist for matching');

/* Survey */
INSERT INTO StartwellDB.Surveys 
(SurveyTitle,NoQues,OptDesc,CategoryID,SurveyStatus) VALUES
('Therapist Macropreference Survey','12','MCQ','TherapistMacroSurvey','A');

/* Survey Questions */

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('2','1','directiveness:','R','30');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('2','2','Emotional Intensity:','R','30');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('2','3','Past Vs Present:','R','30');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('2','4','Warm Vs Challenging:','R','30');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('2','5','What modality of therapy do you offer:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('2','6','How many sessions do you offer in a therapy:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('2','7','How long do your your sessions Usually last','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('2','8','What orientation of therapy do you offer:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('2','9','What are some of the concerns you provide therapy for:','C','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('2','10','Do you Suggest self help books, apps or podcasts:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('2','11','Do you Suggest support groups:','R','25');

INSERT INTO StartwellDB.SQuestions (SurveyID,QuesID,QText,RespType,Weights) VALUES 
('2','12','Do you offer telehealth Services:','R','25');


/* Option Insertion */


INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','1','1','Strong Directive Preference');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','1','2','Strong Client Preference');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','1','3','NO Preference');

/* Emotional Intensity */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','2','1','Strong Preference for Emotional intensity');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','2','2','Strong Preference for Emotionally reserved');

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','2','3','NO preference');


/* Past Vs. Present */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','3','1','Strong Past Preference');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','3','2','Strong Present Preference');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','3','3','No Preference');

/* Warm vs. Challenging */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','4','1','Strong Warm and Supportive Preference');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','4','2','Strong Focus and Challenging Preference ');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','4','3','No Preference');



/*Modulatity*/

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','5','1','Individual');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','5','2','Couples');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','5','3','Family');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','5','4','Group');

/*  how many Sessions */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','6','1','5');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','6','2','22');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','6','3','20');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','6','4','Long term');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','6','5','Open Ended');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','6','6','I am Not Sure');

/* How long */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','7','1','25 minutes');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','7','2','30 minutes');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','7','3','45 minutes');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','7','4','60 minutes');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','7','5','I am Not Sure');



/* Orientation */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','8','1','I really don’t know');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','8','2','Cognitive / Cognitive-Behavioral');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','8','3','Psychodynamic');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','8','4','Person Centered');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','8','5','Other');

/* concern */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','1','Anxiety and stress');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','2','Depression and self-esteem');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','3','Relationships/lack thereof ');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','4','Habits and behaviors');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','5','Trouble getting through the day');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','6','Trouble being in the present moment');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','7','Substance use behaviors');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','8','Bipolar symptoms');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','9','OCD symptoms');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','10','Trauma or PTSD symptoms');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','11','ADD/ADHD symptoms ');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','12','Eating disorder symptoms');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','13','Grief symptoms');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','14','BPD symptoms ');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','15','Trouble with sex');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','16','Child/adolescent ');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','17','Family');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','9','18','Chronic Pain ');

/* Self help */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','10','1','Yes');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','10','2','No');

/* support group */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','11','2','Yes');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','11','2','No');


/* Tele health */

INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','12','1','Yes');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','12','2','QuesID of both in person and telehealth');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','12','3','I’d prefer it in person');
INSERT INTO StartwellDB.QOptions (SurveyID,QuesID,OptID,OptText) 
VALUES ('2','12','4','No I only want in person');
