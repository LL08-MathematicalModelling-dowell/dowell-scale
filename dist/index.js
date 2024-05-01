import * as React from 'react';
import { useState, useMemo } from 'react';

const NpxScale = (props) => {
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [responseReceived, setResponseReceived] = useState(false);
    const buttonLinks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const handleButtonClick = async (index) => {
        setLoadingIndex(index);
        try {
            const response = await fetch(`https://100035.pythonanywhere.com/addons/create-response/?workspace_id=${props.workspace_id}&username=${props.username}&scale_id=${props.scale_id}&item=${index}`);
            const data = await response.json();
            console.log(data);
            setResponseReceived(true);
        }
        catch (error) {
            console.error('Error:', error);
        }
        finally {
            setLoadingIndex(null);
        }
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
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [responseReceived, setResponseReceived] = useState(false);
    const getButtonData = (number) => {
        switch (number) {
            case 2: return ["😞 No", "😁 Yes"];
            case 3: return ["😞 Disagree", "😔 Can't Say", "😁 Agree"];
            case 4: return ["😞 Strongly Disagree", "😔 Disagree", "😄 Agree", "😁 Strongly Agree"];
            case 5: return ["😞 Strongly Disagree", "😔 Disagree", "😔 Neutral", "😄 Agree", "😁 Strongly Agree"];
            case 7: return ["😞 Strongly Disagree", "😌 Somewhat Disagree", "😔 Disagree", "😐 Neutral", "🙂 Somewhat Agree", "😄 Agree", "😁 Strongly Agree"];
            case 9: return ["😁 Strongly Agree", "😄 Agree", "😀 Moderately Agree", "🙂 Mildly Agree", "😐 Neither Agree nor Disagree", "😌 Mildly Disagree", "😕 Moderately Disagree", "😔 Disagree", "😞 Strongly Disagree"];
            default: return [];
        }
    };
    const data = getButtonData(props.pointers);
    const handleButtonClick = async (index) => {
        setLoadingIndex(index);
        try {
            const response = await fetch(`https://100035.pythonanywhere.com/addons/create-response/?workspace_id=${props.workspace_id}&username=${props.username}&scale_id=${props.scale_id}&item=${index}`);
            const data = await response.json();
            console.log(data);
            setResponseReceived(true);
        }
        catch (error) {
            console.error('Error:', error);
        }
        finally {
            setLoadingIndex(null);
        }
    };
    return (React.createElement("div", null, responseReceived ? (React.createElement("div", { style: {
            marginTop: '20px',
            fontSize: '1.2rem',
            color: '#007bff',
            textAlign: 'center'
        } }, "Thanks for your response!")) : (React.createElement(React.Fragment, null,
        React.createElement("div", { style: {
                height: "50px",
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '10px',
            }, className: 'button-container' }, data.map((review, index) => (React.createElement(React.Fragment, { key: index },
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
                    border: "none",
                    position: "relative",
                    borderRadius: '30px',
                    cursor: 'pointer',
                    margin: '5px',
                    transition: 'background-color 0.3s ease',
                    ...(loadingIndex === index ? { pointerEvents: 'none', backgroundColor: '#0056b3' } : {}),
                }, onClick: () => handleButtonClick(index), disabled: loadingIndex === index, className: 'button-changes' }, loadingIndex === index ? (React.createElement(React.Fragment, null,
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
                React.createElement("div", { className: "spinner" }))) : (review))))))))));
};

const NpxLite = (props) => {
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [responseReceived, setResponseReceived] = useState(false);
    const data = ["😞 No", "😔 May be", "😀 Yes"];
    const handleButtonClick = async (index) => {
        setLoadingIndex(index);
        try {
            const response = await fetch(`https://100035.pythonanywhere.com/addons/create-response/?workspace_id=${props.workspace_id}&username=${props.username}&scale_id=${props.scale_id}&item=${index}`);
            const data = await response.json();
            console.log(data);
            setResponseReceived(true);
        }
        catch (error) {
            console.error('Error:', error);
        }
        finally {
            setLoadingIndex(null);
        }
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
    const arr = useMemo(() => generateArray(props.axis_limit), [props.axis_limit]);
    const handleButtonClick = async (index) => {
        setLoadingIndex(index);
        try {
            const response = await fetch(`https://100035.pythonanywhere.com/addons/create-response/?workspace_id=${props.workspace_id}&username=${props.username}&scale_id=${props.scale_id}&item=${index}`);
            const data = await response.json();
            console.log(data);
            setResponseReceived(true);
        }
        catch (error) {
            console.error('Error:', error);
        }
        finally {
            setLoadingIndex(null);
        }
    };
    return (React.createElement("div", null, responseReceived ? (React.createElement("div", { style: {
            marginTop: '20px',
            fontSize: '1.2rem',
            color: '#007bff',
            textAlign: 'center'
        } }, "Thanks for your response!")) : (React.createElement(React.Fragment, null,
        React.createElement("div", { style: {
                marginTop: '5px',
                width: "100%",
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: "center",
            } },
            React.createElement("div", { style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: "center",
                    backgroundColor: props.buttonColor || "orange",
                    gap: '10px',
                    width: "max-content",
                    padding: "10px",
                    borderRadius: "4px"
                }, className: 'button-container' }, arr.map((number) => (React.createElement(React.Fragment, { key: number },
                React.createElement("button", { style: {
                        fontSize: '0.9rem',
                        border: 'none',
                        borderRadius: "50%",
                        cursor: 'pointer',
                        color: "orange",
                        fontWeight: 600,
                        transition: 'background-color 0.3s ease',
                        ...(loadingIndex === number ? { pointerEvents: 'none', backgroundColor: '#0056b3' } : {}),
                    }, className: 'button-changes', onClick: () => handleButtonClick(number), disabled: loadingIndex === number }, loadingIndex === number ? (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "spinner" }))) : (String(number))))))))))));
};

const RatingScale = ({ workspace_id, username, scale_id, buttonColor, scale_type, axis_limit, pointers }) => {
    return (React.createElement("div", { style: {
            margin: '0 auto',
            padding: '20px',
            textAlign: 'center'
        } },
        scale_type === 'nps' && (React.createElement(NpxScale, { workspace_id: workspace_id, username: username, scale_id: scale_id, buttonColor: buttonColor || "" })),
        scale_type === 'nps_lite' && (React.createElement(NpxLite, { workspace_id: workspace_id, username: username, scale_id: scale_id, buttonColor: buttonColor || "" })),
        scale_type === 'stapel' && (React.createElement(NpxStapel, { workspace_id: workspace_id, username: username, scale_id: scale_id, buttonColor: buttonColor || "", axis_limit: axis_limit || 0 })),
        scale_type === 'likert' && (React.createElement(NpxLikert, { workspace_id: workspace_id, username: username, scale_id: scale_id, buttonColor: buttonColor || "", pointers: pointers || 0 }))));
};

export { NpxLikert, NpxLite, NpxScale, NpxStapel, RatingScale };
