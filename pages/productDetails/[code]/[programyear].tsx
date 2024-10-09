import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import TitleAndRating from '../_components/TitleAndRating';
import WatchVideoAndMap from '@/pages/productDetails/_components/WatchVideoAndMap';
import Tags from '@/components/products/Tags';
import LocationAndPriceAndTime from '../_components/LocationAndPriceAndTime';
import Accordion from '@/components/products/Accordion';
import DetailsTabs from '../_components/DetailsTabs';
import { useGetDetailsQuery } from '@/store/Products/FetchDetailsApi';
import { useGetIncludingQuery } from '@/store/Products/FetchTourIncludingApi';
import { useGetPolicyQuery } from '@/store/Products/FetchPolicyApi';

interface Props {}

const Index: NextPage<Props> = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { code, programyear } = router.query;

    // fetch details
    const { data, error, isLoading } = useGetDetailsQuery(
        code && programyear ? { code, programyear } : null
    );

    // fetch tour including
    const { data: includingData, error: includingError } = useGetIncludingQuery({
        code,
        programyear,
    });
    const including = includingData?.items || [];

    // fetch tour including
    const { data: policyData, error: policyError } = useGetPolicyQuery({
        code,
        programyear,
    });
    const policy = policyData?.items || [];

    if (includingError) {
        console.error('Including API Error:', includingError);
    }

    if (isLoading) {
        return <CircularProgress />;
    }

    if (error) {
        console.error('Error:', error);
        return (
            <Typography variant="h6" color="error">
                {t('Error loading product details: ')}
            </Typography>
        );
    }

    if (!data || !data.items || data.items.length === 0) {
        return <Typography variant="h6">{t('No product details found.')}</Typography>;
    }

    const productData = data.items[0];

    return (
        <div>
            <Head>
                <title>{productData.ProgramName} - Product Details</title>
            </Head>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 3 }}>
                    <TitleAndRating title={productData.ProgramName} />
                    <WatchVideoAndMap />
                    <Tags tags={productData.ClassTrip} />
                    <LocationAndPriceAndTime
                        time={`${productData.day} days`}
                        location={productData.City}
                        price={productData.StartPrice || 'Price Not Available'}
                    />
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Accordion
                                data={[
                                    {
                                        title: 'Tour Including',
                                        des:
                                            including[0]?.TourIncludin ||
                                            'No Tour Including available.',
                                    },
                                    {
                                        title: 'Cancellation policy',
                                        des: policy[0]?.policy || 'No Tour policy available.',
                                    },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <DetailsTabs id={`${code}`} productData={productData} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
};

export default Index;
