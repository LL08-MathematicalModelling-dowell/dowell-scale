
# DoWellScale

DowellScale provides wide range of UI features based on scale types.


## Installation

Install my-project with npm

```bash
  npm install @dowelllabs/dowellscale

```
    
## Importing
import {RatingScale} from "@dowelllabs/dowellscale"


## Demo

RatingScale accepts properties based on the scale types.

we have 4 different scale types.

1.nps scale type




## 1.nps scale type 
       <RatingScale
         workspace_id=your_workspace_id
         username=your_username
         scale_name=your_scale_name
         no_of_responses= no_of_responses you need
         buttonColor=buttonColor of your choice
         scale_type="nps"
        />

Note:-All the above parameters are strings.

![App Screenshot](https://github.com/LL08-MathematicalModelling-dowell/dowell-scale/assets/127480764/a0d85004-a3b0-4837-9cdb-c46c23a28a9a)

This scale provides ratings ranging from 0-10,once user clicks on the button the response will get submitted.


## 2.nps_lite scale type 
       <RatingScale
         workspace_id=your_workspace_id
         username=your_username
         scale_name=your_scale_name
         no_of_responses= no_of_responses you need
         buttonColor=buttonColor of your choice
         scale_type="nps_lite"
        />


![App Screenshot](https://github.com/LL08-MathematicalModelling-dowell/dowell-scale/assets/127480764/af5962f3-ba41-4a80-ac2a-66eb66e8d8c9)

This scale provides three buttons as shown.

## 3.likert scale type 
       <RatingScale
         workspace_id=your_workspace_id
         username=your_username
         scale_name=your_scale_name
         no_of_responses= no_of_responses you need
         buttonColor=buttonColor of your choice
         scale_type="likert"
         pointers={3} or {4} or {5} or {7} or {9}
        />

likert scale type accepts an extra property named pointers which is of type number.

Buttons will be dynamically displayed based on the data inside the pointers

3 pointers:-
![App Screenshot](https://github.com/LL08-MathematicalModelling-dowell/dowell-scale/assets/127480764/d29aa7bc-c140-4184-8653-49b135227d42)

4 pointers:-
![App Screenshot](https://github.com/LL08-MathematicalModelling-dowell/dowell-scale/assets/127480764/786c43e6-04af-4e87-af8b-d0dfc0da1ebd)

5 pointers:-
![App Screenshot](https://github.com/LL08-MathematicalModelling-dowell/dowell-scale/assets/127480764/a6e347c9-01fa-410b-848f-c41402ad0def)

7 pointers:-
![App Screenshot](https://github.com/LL08-MathematicalModelling-dowell/dowell-scale/assets/127480764/0ea37f30-29d7-41ac-abef-a6ff2e8ea1ee)

9 pointers:-
![App Screenshot](https://github.com/LL08-MathematicalModelling-dowell/dowell-scale/assets/127480764/075b91ef-1054-451a-9542-56b427f6063b)

Note:-These buttons are designed to adapt to all screen sizes. On smaller screens, only emojis are displayed. However, hovering over an emoji will reveal the corresponding content on the screen.

## 4.stapel scale type 
       <RatingScale
         workspace_id=your_workspace_id
         username=your_username
         scale_name=your_scale_name
         no_of_responses= no_of_responses you need
         buttonColor=buttonColor of your choice
         scale_type="stapel"
         axis_limit={5}
        />

Note:-stapel scale type accepts an extra property named axis_limit which is of type number.It ranges from 1 to 5

It will generate buttons ranging from -ve to +ve 

If axis_limit is 5 then

![App Screenshot](https://github.com/LL08-MathematicalModelling-dowell/dowell-scale/assets/127480764/ab812c81-562a-4520-a4a2-f2526295806a)



Note:-The "Number of responses" refers to the maximum number of responses that can be submitted. If this limit is exceeded, further responses will no longer be accepted.