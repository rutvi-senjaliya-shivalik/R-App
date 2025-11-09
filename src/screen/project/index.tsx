import React from 'react';
import { Container, HeaderComponent } from '../../components/common';
import { useTranslation } from '../../context/LanguageContext';

const Project = (props: any) => {
  const { t } = useTranslation();
  return (
    <Container>
      <HeaderComponent
        Title={t('project.projects')}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
    </Container>
  );
};

export default Project;
