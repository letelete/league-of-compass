import CircularLabeledLoadingIndicator from '../../components/LoadingIndicators/CircularLabeledLoadingIndicator';
import Page from '../Page';
import React from 'react';

const MyProfilePage = () => {
  return (
    <Page className="page--my-profile">
      <CircularLabeledLoadingIndicator label="TODO" />
    </Page>
  );
};

export default MyProfilePage;
