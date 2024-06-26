import * as React from 'react';
interface NpxStapelProps {
    workspace_id: string;
    username: string;
    scale_id: string;
    axis_limit: number;
    buttonColor?: string;
    scale_name: string;
    no_of_responses: string;
}
declare const NpxStapel: React.FC<NpxStapelProps>;
export { NpxStapel };
