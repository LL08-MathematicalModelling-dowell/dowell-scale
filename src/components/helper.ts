async function sendRequest(obj: any, index: number) {
    try {
        let requestOptions: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "workspace_id": obj.workspace_id,
                "username": obj.username,
                "scale_name": obj.scale_name,
                "channel_instance_list": [
                    {
                        "channel_name": "channel_1",
                        "channel_display_name": "sg_Website",
                        "instances_details": [
                            {
                                "instance_name": "instances_1",
                                "instance_display_name": "HomePage"
                            }
                        ]
                    }
                ],
                "scale_type": obj.scale_type,
                "axis_limit": obj.axis_limit || 0,
                "pointers": obj.pointers || 0,
                "user_type": false,
                "no_of_responses": obj.no_of_responses
            })
        };
        const response = await fetch(`https://100035.pythonanywhere.com/addons/create-scale/v3/`, requestOptions);
        const data = await response.json();

        if (data.urls && data.urls.length > 0) {
            const instanceURL = data.urls[0].urls[0].instance_urls;
            if(obj.axis_limit){
                if(index>0){
                    index+=4
                   }
                   else{
                    index+=5
                   }
             }
            const res = await fetch(instanceURL[index]);
            console.log(await res.json());

            obj.setResponseReceived(true);
        } else {
            console.error('No URLs found in the response data');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        obj.setLoadingIndex(null);
    }
    return null;
}

function handleMouseEnter(index: number, pointers: number, width: number, setText: Function) {
    let reviews: string[] = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree",
        "Strongly Disagree", "somewhat Disgaree", "Disagree", "Neutral", "Somewhat Agree", "Agree", "Strongly Agree",
        "Strongly Disagree", "Disagree ","Moderately Disagree","Mildly Disagree", "Neither Agree nor Disagree", "Mildly Agree", 
        "Moderately Agree", "Agree", "Strongly Agree"
    ];
    if (width < 968 && pointers == 7)
        setText(reviews[index + 5]);
    if (width < 670 && pointers == 5)
        setText(reviews[index]);
    if (pointers == 9)
        setText(reviews[index + 5 + 7]);
    return "";
}

export { sendRequest, handleMouseEnter };
