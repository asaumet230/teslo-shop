import { FC } from 'react';

// MUI:
import { Box, Button } from '@mui/material';

// Interfaces:
import { ISize } from '../../interfaces';

interface Props {
    selectedSize?: ISize;
    sizes: ISize[];
    onSelectedSize: (size: ISize) => void;
}


export const SizeSelector: FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {




    return (
        <Box>
            {
                sizes.map(size => (
                    <Button
                        onClick={() => onSelectedSize(size)}
                        key={size}
                        size='small'
                        color={selectedSize === size ? 'primary' : 'info'}
                    >
                        {size}
                    </Button>

                ))
            }
        </Box>

    )
}

export default SizeSelector;