import React from 'react';
import {
  Container,
  HeaderComponent,
} from '../../components/common';


const Project = (props: any) => {


  return (
    <Container>
      <HeaderComponent
        Title="Project"
        onPress={() => {
          props.navigation.goBack();
        }}
      />

    </Container>
  );
};

export default Project;
