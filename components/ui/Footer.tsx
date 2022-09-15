import { FC } from 'react';
import NextLink from 'next/link';

// MUI:
import { Box, Button, Link, Typography } from '@mui/material';

export const Footer: FC = () => {


    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
            sx={{ padding: '20px 30px', borderTop: '1px solid #f2f2f2' }}
        >

            <Box
                display='flex'
                justifyContent='center'
                mb={1}
            >
                <NextLink href='/' passHref>
                    <Link>
                        <Button sx={{ color: '#5C5E62' }}>
                            Privacy & Legal
                        </Button>
                    </Link>
                </NextLink>

                <NextLink href='/' passHref>
                    <Link>
                        <Button sx={{ color: '#5C5E62' }}>
                            Location
                        </Button>
                    </Link>
                </NextLink>
            </Box>


            <Box display='flex' >
                <Typography sx={{ color: '#5C5E62' }}>Teslo &copy;</Typography>
                <Typography sx={{ color: '#5C5E62', marginLeft: 1 }}>{new Date().getFullYear()}</Typography>
            </Box>
        </Box >
    )
}

export default Footer