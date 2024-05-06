import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';

async function sendRequest(obj, index) {
    console.log(obj);
    try {
        let requestOptions = {
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
        console.log(requestOptions);
        const response = await fetch(`https://100035.pythonanywhere.com/addons/create-scale/v3/`, requestOptions);
        const data = await response.json();
        if (data.urls && data.urls.length > 0) {
            const instanceURL = data.urls[0].urls[0].instance_urls;
            console.log(instanceURL);
            if (obj.axis_limit) {
                if (obj.axis_limit > 0)
                    index += 4;
                else
                    index += 5;
            }
            console.log(index);
            const res = await fetch(instanceURL[index]);
            console.log(await res.json());
            obj.setResponseReceived(true);
        }
        else {
            console.error('No URLs found in the response data');
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        obj.setLoadingIndex(null);
    }
    return null;
}
function handleMouseEnter(index, pointers, width, setText) {
    console.log(index, pointers, width);
    let reviews = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree",
        "Strongly Disagree", "somewhat Disgaree", "Disagree", "Neutral", "Somewhat Agree", "Agree", "Strongly Agree",
        "Strongly Agree", "Agree", "Moderately Agree", "Mildly Agree", "Neither Agree nor Disagree", "Mildly Disagree",
        "Moderately Disagree", "Disagree", "Strongly Disagree"
    ];
    if (width < 968 && pointers == 7)
        setText(reviews[index + 5]);
    if (width < 670 && pointers == 5)
        setText(reviews[index]);
    if (pointers == 9)
        setText(reviews[index + 5 + 7]);
    return "";
}

const NpxScale = (props) => {
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [responseReceived, setResponseReceived] = useState(false);
    const buttonLinks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const handleButtonClick = async (index) => {
        setLoadingIndex(index);
        let obj = {
            workspace_id: props.workspace_id,
            username: props.username,
            scale_name: props.scale_name,
            scale_type: "nps",
            no_of_responses: props.no_of_responses,
            setLoadingIndex,
            setResponseReceived
        };
        sendRequest(obj, index);
    };
    return (React.createElement("div", null,
        React.createElement("h2", { style: {
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                fontSize: '1.5rem',
                marginBottom: '20px',
                textAlign: 'center',
                fontWeight: 'normal'
            } }, "On a scale of 0-10, how likely are you to recommend the product to a friend or a colleague?"),
        responseReceived ? (React.createElement("div", { style: {
                marginTop: '20px',
                fontSize: '1.2rem',
                color: '#007bff',
                textAlign: 'center'
            } }, "Thanks for your response!")) : (React.createElement(React.Fragment, null,
            React.createElement("style", { scoped: true }, `
          .button-container {
            height: 31px;
          }
  
          @media (min-width: 768px) { 
            .button-container {
              height: 44px;
            }
          }
        `),
            React.createElement("div", { style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '10px'
                }, className: 'button-container' }, buttonLinks.map((index) => (React.createElement(React.Fragment, { key: index },
                React.createElement("style", { scoped: true }, `
        .button-changes {
          padding: 5px 10px;
        }

        @media (min-width: 768px) { 
          .button-changes {
            padding: 10px 20px;
          }
        }
      `),
                React.createElement("button", { style: {
                        fontSize: '0.9rem',
                        backgroundColor: "green",
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        ...(loadingIndex === index ? { pointerEvents: 'none', backgroundColor: '#0056b3' } : {}),
                    }, className: 'button-changes', onClick: () => handleButtonClick(index), disabled: loadingIndex === index }, loadingIndex === index ? (React.createElement(React.Fragment, null,
                    React.createElement("style", { scoped: true }, `
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
            
                    .spinner {
                        border: 3px solid rgba(0, 0, 0, 0.1);
                        border-top: 3px solid #007bff;
                        border-radius: 50%;
                        width: 12px;
                        height: 12px;
                        animation: spin 2s linear infinite;
                    }
                `),
                    React.createElement("div", { className: "spinner" }))) : (index))))))))));
};

const NpxLikert = (props) => {
    const getButtonData = (number) => {
        switch (number) {
            case 2: return ["😞 No", "😁 Yes"];
            case 3: return ["😞 Disagree", "😔 Can't Say", "😁 Agree"];
            case 4: return ["😞 Strongly Disagree", "😔 Disagree", "😄 Agree", "😁 Strongly Agree"];
            case 5: return ["😞 Strongly Disagree", "😔 Disagree", "😔 Neutral", "😄 Agree", "😁 Strongly Agree"];
            case 7: return ["😞 Strongly Disagree", "😌 Somewhat Disgaree", "😔 Disagree", "😐 Neutral", "🙂 Somewhat Agree", "😄 Agree", "😁 Strongly Agree"];
            case 9: return ["😁 ", "😃 ", "😄 ", "🙂 ", "😐 ", "😕", "😌 ", "😔 ", "😞 "];
            default: return [];
        }
    };
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [responseReceived, setResponseReceived] = useState(false);
    const [buttonLinks, setButtonLinks] = useState(getButtonData(props.pointers));
    const [text, setText] = useState("");
    useEffect(() => {
        handleResize();
        const listener = window.addEventListener("resize", handleResize);
        function handleResize() {
            if (props.pointers == 7 && window.innerWidth < 968)
                setButtonLinks(["😞  ", "😌  ", "😔 ", "😐 ", "🙂  ", "😄 ", "😁  "]);
            else if (props.pointers == 5 && window.innerWidth < 670)
                setButtonLinks(["😞", "😔 ", "😐 ", "😄 ", "😁 "]);
            else
                setButtonLinks(getButtonData(props.pointers));
        }
        return () => { window.removeEventListener("resize", listener); };
    }, []);
    getButtonData(props.pointers);
    const handleButtonClick = async (index) => {
        setLoadingIndex(index);
        let obj = {
            workspace_id: props.workspace_id,
            username: props.username,
            scale_name: props.scale_name,
            scale_type: "likert",
            no_of_responses: props.no_of_responses,
            pointers: props.pointers,
            setLoadingIndex,
            setResponseReceived
        };
        sendRequest(obj, index);
    };
    return (React.createElement("div", null, responseReceived ? (React.createElement("div", { style: {
            marginTop: '20px',
            fontSize: '1.2rem',
            color: '#007bff',
            textAlign: 'center'
        } }, "Thanks for your response!")) : (React.createElement(React.Fragment, null,
        props.pointers == 5 && (React.createElement("style", { scoped: true }, `

           .button-changes {
            padding: 10px 10px;
            font-size: 1.5rem;
            }

           @media (min-width: 670px) { 
              .button-changes {
              padding: 5px 5px;
              font-size: 1rem;
              }
            }
  
              @media (min-width: 968px) { 
              .button-changes {
                  padding: 10px 20px;
                  font-size: 1.25rem;
              }
              }
          `)),
        props.pointers == 9 && (React.createElement("style", { scoped: true }, `
           .button-changes {
            padding: 5px;
            font-size: 1.25rem;
            }

            @media (min-width: 560px) { 
              .button-changes {
              padding: 5px 5px;
              font-size: 1.5rem;
              }
            }
  
              @media (min-width: 827px) { 
              .button-changes {
                  padding: 10px 20px;
                  font-size: 1.5rem;
              }
              }
          `)),
        props.pointers == 7 && (React.createElement("style", { scoped: true }, `
              .button-changes {
                padding: 5px 5px;
                font-size:1.5rem;
                }
                 @media (min-width: 584px){
               .button-changes {
                padding: 10px 10px;
                font-size:1.5rem;
                }
              }
               @media (min-width: 968px){
               .button-changes {
                padding: 5px 5px;
                font-size:0.9rem;
                }
              }
                @media (min-width: 1057px){
                  .button-changes {
                  padding: 5px 5px;
                  font-size: 1rem;
                  }
                }
      
                  @media (min-width: 1265px) { 
                  .button-changes {
                      padding: 10px 20px;
                      font-size: 1rem;
                  }
                  }
              `)),
        props.pointers <= 4 &&
            (React.createElement("style", { scoped: true }, `
                  .button-changes {
                  padding: 5px 10px;
              
                  }
      
                  @media (min-width: 792px) { 
                  .button-changes {
                      padding: 10px 20px;
                      font-size: 1.25rem;
                  }
                  }
              `)),
        React.createElement("div", { style: {
                height: "50px",
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '10px',
                position: "absolute",
                left: 0,
                right: 0,
                margin: "0 auto"
            }, className: 'button-container' },
            buttonLinks.map((review, index) => {
                return (React.createElement(React.Fragment, { key: index },
                    React.createElement("button", { style: {
                            fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                            backgroundColor: props.buttonColor || "hsl(120, 70%, 60%)",
                            fontWeight: 500,
                            border: "none",
                            position: "relative",
                            borderRadius: '30px',
                            cursor: 'pointer',
                            margin: '5px',
                            transition: 'background-color 0.3s ease',
                            ...(loadingIndex === index ? { pointerEvents: 'none', backgroundColor: '#0056b3' } : {}),
                        }, onClick: () => handleButtonClick(index), onMouseEnter: () => handleMouseEnter(index, props.pointers, window.innerWidth, setText), onMouseLeave: () => { setText(''); }, disabled: loadingIndex === index, className: 'button-changes' }, loadingIndex === index ? (React.createElement(React.Fragment, null,
                        React.createElement("style", { scoped: true }, `
                  @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                  }
          
                  .spinner {
                      border: 3px solid rgba(0, 0, 0, 0.1);
                      border-top: 3px solid #007bff;
                      border-radius: 50%;
                      width: 12px;
                      height: 12px;
                      animation: spin 2s linear infinite;
                  }
              `),
                        React.createElement("div", { className: "spinner" }))) : (review))));
            }),
            text.length > 0 &&
                React.createElement("p", { style: {
                        position: 'absolute',
                        top: '30px',
                        color: 'green',
                        padding: '10px',
                        borderRadius: '5px',
                    } }, text))))));
};

const NpxLite = (props) => {
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [responseReceived, setResponseReceived] = useState(false);
    const data = ["😞 No", "😔 May be", "😀 Yes"];
    const handleButtonClick = async (index) => {
        setLoadingIndex(index);
        let obj = {
            workspace_id: props.workspace_id,
            username: props.username,
            scale_name: props.scale_name,
            scale_type: "nps_lite",
            no_of_responses: props.no_of_responses,
            setLoadingIndex,
            setResponseReceived
        };
        sendRequest(obj, index);
    };
    return (React.createElement("div", null,
        React.createElement("h2", { style: {
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                fontSize: '1.5rem',
                marginBottom: '10px',
                textAlign: 'center',
                fontWeight: 'normal',
                marginTop: '5px',
            } }, "Do you wish to recommend this application to your friend?"),
        responseReceived ? (React.createElement("div", { style: {
                marginTop: '20px',
                fontSize: '1.2rem',
                color: '#007bff',
                textAlign: 'center',
            } }, "Thanks for your response!")) : (React.createElement(React.Fragment, null,
            React.createElement("div", { style: {
                    height: '50px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '10px',
                }, className: "button-container" }, data.map((review, index) => {
                return (React.createElement(React.Fragment, { key: index },
                    React.createElement("style", { scoped: true }, `
                      .button-changes {
                        padding: 5px 10px;
                      }
        
                      @media (min-width: 768px) { 
                        .button-changes {
                          padding: 10px 20px;
                          font-size: 1.25rem;
                        }
                      }
                    `),
                    React.createElement("button", { style: {
                            fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                            backgroundColor: props.buttonColor || "hsl(120, 70%, 60%)",
                            fontWeight: 500,
                            border: 'none',
                            position: 'relative',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            margin: '5px',
                            transition: 'background-color 0.3s ease',
                            ...(loadingIndex === index
                                ? {
                                    pointerEvents: 'none',
                                    backgroundColor: '#0056b3',
                                }
                                : {}),
                        }, onClick: () => handleButtonClick(index), disabled: loadingIndex === index, className: "button-changes" }, loadingIndex === index ? (React.createElement(React.Fragment, null,
                        React.createElement("style", { scoped: true }, `
                            @keyframes spin {
                              0% { transform: rotate(0deg); }
                              100% { transform: rotate(360deg); }
                            }
            
                            .spinner {
                              border: 3px solid rgba(0, 0, 0, 0.1);
                              border-top: 3px solid #007bff;
                              border-radius: 50%;
                              width: 12px;
                              height: 12px;
                              animation: spin 2s linear infinite;
                            }
                          `),
                        React.createElement("div", { className: "spinner" }))) : (review))));
            }))))));
};

const NpxStapel = (props) => {
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [responseReceived, setResponseReceived] = useState(false);
    const generateArray = (number) => {
        const result = [];
        for (let i = -number; i <= number; i++) {
            if (i !== 0)
                result.push(i);
        }
        return result;
    };
    const buttonLinks = useMemo(() => generateArray(props.axis_limit), [props.axis_limit]);
    const handleButtonClick = async (index) => {
        setLoadingIndex(index);
        let obj = {
            workspace_id: props.workspace_id,
            username: props.username,
            scale_name: props.scale_name,
            scale_type: "stapel",
            axis_limit: props.axis_limit,
            no_of_responses: props.no_of_responses,
            setLoadingIndex,
            setResponseReceived
        };
        console.log(index);
        sendRequest(obj, index);
    };
    return (React.createElement("div", null,
        React.createElement("h2", { style: {
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                fontSize: '1.5rem',
                marginBottom: '10px',
                marginTop: "10px",
                textAlign: 'center',
                fontWeight: 'normal'
            } },
            "On a scale of -",
            props.axis_limit,
            " to ",
            props.axis_limit,
            ", how likely are you to recommend the product to a friend or a colleague?"),
        responseReceived ? (React.createElement("div", { style: {
                marginTop: '20px',
                fontSize: '1.2rem',
                color: '#007bff',
                textAlign: 'center'
            } }, "Thanks for your response!")) : (React.createElement(React.Fragment, null,
            React.createElement("style", { scoped: true }, `
          .button-container {
            height: 31px;
          }
  
          @media (min-width: 768px) { 
            .button-container {
              height: 44px;
            }
          }
        `),
            React.createElement("div", { style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '10px'
                }, className: 'button-container' }, buttonLinks.map((index) => (React.createElement(React.Fragment, { key: index },
                React.createElement("style", { scoped: true }, `
        .button-changes {
          padding: 5px 10px;
        }

        @media (min-width: 768px) { 
          .button-changes {
            padding: 10px 20px;
          }
        }
      `),
                React.createElement("button", { style: {
                        fontSize: '0.9rem',
                        backgroundColor: props.buttonColor || "hsl(120, 70%, 60%)",
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        ...(loadingIndex === index ? { pointerEvents: 'none', backgroundColor: '#0056b3' } : {}),
                    }, className: 'button-changes', onClick: () => handleButtonClick(index), disabled: loadingIndex === index }, loadingIndex === index ? (React.createElement(React.Fragment, null,
                    React.createElement("style", { scoped: true }, `
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
            
                    .spinner {
                        border: 3px solid rgba(0, 0, 0, 0.1);
                        border-top: 3px solid #007bff;
                        border-radius: 50%;
                        width: 12px;
                        height: 12px;
                        animation: spin 2s linear infinite;
                    }
                `),
                    React.createElement("div", { className: "spinner" }))) : (index))))))))));
};

const RatingScale = ({ workspace_id, username, scale_id, buttonColor, scale_type, axis_limit, pointers, scale_name, no_of_responses }) => {
    return (React.createElement("div", { style: {
            minHeight: "60px",
            minWidth: "400px",
            margin: "5px",
            padding: "10px",
            textAlign: "center"
        } },
        scale_type === 'nps' && (React.createElement(NpxScale, { workspace_id: workspace_id, username: username, scale_id: scale_id, buttonColor: buttonColor || "", scale_name: scale_name, no_of_responses: no_of_responses })),
        scale_type === 'nps_lite' && (React.createElement(NpxLite, { workspace_id: workspace_id, username: username, scale_id: scale_id, buttonColor: buttonColor || "", scale_name: scale_name, no_of_responses: no_of_responses })),
        scale_type === 'stapel' && (React.createElement(NpxStapel, { workspace_id: workspace_id, username: username, scale_id: scale_id, buttonColor: buttonColor || "", axis_limit: axis_limit || 0, scale_name: scale_name, no_of_responses: no_of_responses })),
        scale_type === 'likert' && (React.createElement(NpxLikert, { workspace_id: workspace_id, username: username, scale_id: scale_id, buttonColor: buttonColor || "", pointers: pointers || 0, scale_name: scale_name, no_of_responses: no_of_responses }))));
};

export { NpxLikert, NpxLite, NpxScale, NpxStapel, RatingScale, handleMouseEnter, sendRequest };
