type TIconTypes = 'secondary' | 'primary' | 'error' | 'success' | 'custom';
type TIconSizes = 'normal' | 'big';

export type TIconProps = { type: TIconTypes; onClick?: () => void; size: TIconSizes };

export const getIconColor = (type: TIconTypes) => {
    return `${
        type === 'secondary'
            ? '#8585AD'
            : type === 'error'
            ? '#E52B1A'
            : type === 'success'
            ? '#00CCCC'
            : '#F2F2F3'
    }`;
};

export const getIconSize = (size: TIconSizes) => {
    return `${
        size === 'normal'
            ? '24px'
            : '30px'
    }`;
};