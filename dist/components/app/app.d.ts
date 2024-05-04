import * as React from 'react';
interface RatingScaleProps {
    workspace_id: string;
    username: string;
    scale_id: string;
    buttonColor?: string;
    scale_type: string;
    axis_limit?: number;
    pointers?: number;
}
declare const RatingScale: React.FC<RatingScaleProps>;
export { RatingScale };
