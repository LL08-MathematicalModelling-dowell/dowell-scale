import * as React from 'react';
import { useState } from 'react';

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
                    }, className: 'button-changes', onClick: () => handleButtonClick(index), disabled: loadingIndex === index }, loadingIndex === index ? (React.createElement("div", { style: {
                        border: '3px solid rgba(0, 0, 0, 0.1)',
                        borderTop: '3px solid #007bff',
                        borderRadius: '50%',
                        width: '12px',
                        height: '12px',
                        animation: 'spin 1s linear infinite'
                    } })) : (index))))))))));
};

const RatingScale = ({ workspace_id, username, scale_id, buttonColor, scale_type, }) => {
    return (React.createElement("div", { style: {
            margin: '0 auto',
            padding: '20px',
            textAlign: 'center'
        } }, scale_type === 'nps' && (React.createElement(NpxScale, { workspace_id: workspace_id, username: username, scale_id: scale_id, buttonColor: buttonColor }))));
};

export { NpxScale, RatingScale };
