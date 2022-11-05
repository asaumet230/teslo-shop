import React, { FC } from 'react'

import { Grid, Card, CardContent, Typography } from '@mui/material';


interface Props {
    title: string | number;
    subTitle: string;
    icon?: JSX.Element;
}

export const SummaryTile: FC<Props> = ({ title, subTitle, icon }) => {


    return (
        <Grid item xs={12} sm={4} md={3}>
            <Card sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '15px'
            }}>
                <CardContent sx={{
                    width: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {icon}
                </CardContent>

                <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                        variant='h3'
                        component='h3'
                        textAlign='center'>{title}</Typography>
                    <Typography
                        variant='caption'
                        textAlign='center'>{subTitle}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default SummaryTile;