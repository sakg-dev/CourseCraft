So till now we have chapters and subtitles, but when should we like perform those activites and other stuff?? through a btn user presses??? or in the end of chapter??

If i think abt how i prefer watching big videos, idts i would want to click a btn then wait for like 20 seconds to generate and get everything, rather askin in the end must be better, we can also like do smthing like during generation, is user presses escape key, we can stop as user doesn't wanna do it..

------------

So b4 making above thing, i wanted to make the UI better which is why i added sm styles on it and corrected the seek so as to it seeks without reloading..

------------

Ok so now once i watch video and i am closer than minValue to nearest chapter, it should start generating things. But what things?

For every chapters, Take the subtitles and chapters to know type of video and Generate flashback, activities or other available things based on type of video and topic..

------------

Ok so to do above thing, i need a good prompt that will generate unambigiuos response from ai.
Current prompt and other things' problems:
- [] limited activites
- [x] ai not responding with activity as for flashcard, the question and answer..
- [x] Ai js have objective to ask doesn't care if it is needed or not, need a way so that ai can deny if its like intro or such useless things instead of asking to explain and cons and pros lol.

alrit hopefully solved both excpet limited activites, we will be doin that as we go.. But firstly now we have activites and we are making req from frontend, lets handle req's res, actions, and other stuff and actually show the user the activites..

------------

So what we have to do once we get value in frontend? 

I think we do as we doing: make a promise fetch and whenever it gets response, we kind of store value(activities) in sm state ig and show to user.
Alrit i have it in a state, now wt? ig we have to find a way to show to user, mustnot be like a thing we impose but like user can open and do if user wants.. I think we should do like show a bubble, if it is clicked, open dialog for activities, but what if I want to see something in the vid b4 like answering or doing? ig we can make it like expandable and collapsable, user can just collaps it and watch then again expand and submit.. btw i really wanna do transitions while like collapsing and expanding same like macbook transition ngl.

