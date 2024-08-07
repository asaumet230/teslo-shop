import { FC, useState } from "react";

// MUI:
import { Box, IconButton, Typography } from "@mui/material";

// Icons:
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline';

// Interfaces:
import { ICartProduct } from "../../interfaces";


interface Props {
  maxValue: number;
  onQuantitySelected: (quantity: number) => void;
  currentValue: number;

}

export const ItemCounter: FC<Props> = ({ maxValue, onQuantitySelected, currentValue }) => {

  const [counter, setCounter] = useState<number>(currentValue);

  const increaseBy = (value: number): void => {

    let newValue = Math.max(counter + value, 1);

    if (maxValue) {
      newValue = Math.min(newValue, maxValue);
    }

    onQuantitySelected(newValue);
    setCounter(newValue);
  }


  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => increaseBy(-1)}>
        <RemoveCircleOutline />
      </IconButton>

      <Typography sx={{ width: 40, textAlign: 'center' }}> {counter} </Typography>

      <IconButton onClick={() => increaseBy(1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}

export default ItemCounter;