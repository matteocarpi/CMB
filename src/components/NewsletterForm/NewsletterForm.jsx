import React from 'react'
import styled from 'styled-components'
import { Form, Formik, Field } from 'formik'
import { Link } from 'gatsby'
import * as Yup from 'yup'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Input = styled(Field)`
  margin-top: 1rem;
  padding: 0.5rem;
  width: 200px;
  height: 38px;
  background-color: transparent;
  color: white;
  border: solid 2px white;

  &::placeholder {
    color: white;
  }
`

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem;
  width: 100px;
  height: 38px;
  color: ${({ theme }) => theme.navy};
  font-weight: 600;
  background-color: white;
  text-transform: uppercase;
`

const Checkbox = styled(Field)``

const Label = styled.label`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  color: white;
  font-size: 15px;
  a {
    margin-left: 0.5rem;
    color: white;
    text-decoration: underline;

    &:visited {
      color: white;
      text-decoration: underline;
    }
  }
`
const FieldWrapper = styled.div`
  min-width: 200px;
`

const ErrorMessage = styled.p`
  color: red;
  margin: 0;
  margin-left: 1rem;
  font-size: 15px;
`

export default function NewsletterForm() {
  const initialValues = {
    name: '',
    email: '',
    company: '',
    privacy: false,
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Campo Obbligatorio'),
    email: Yup.string()
      .email('Formato email non valido')
      .required('Campo Obbligatorio'),
    company: Yup.string(),
    privacy: Yup.boolean().required('Campo Obbligatorio'),
  })

  const handleSubscribe = ({ values }) => console.log({ values })

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubscribe}
      validateOnBlur
    >
      {({ touched, errors, values }) => (
        <Form>
          {console.log({ errors, values })}
          <Container>
            <FieldWrapper>
              <Input name="name" placeholder="Nome" />
              {touched.name && errors.name && (
                <ErrorMessage>{errors.name}</ErrorMessage>
              )}
            </FieldWrapper>
            <FieldWrapper>
              <Input name="company" placeholder="Azienda" />
              {touched.company && errors.company && (
                <ErrorMessage>{errors.company}</ErrorMessage>
              )}
            </FieldWrapper>
            <FieldWrapper>
              <Input name="email" placeholder="E-Mail" />
              {touched.email && errors.email && (
                <ErrorMessage>{errors.email}</ErrorMessage>
              )}
            </FieldWrapper>
            <FieldWrapper>
              <Label htmlfor="privacy">
                <Checkbox type="checkbox" name="privacy" />
                Accetto la<Link to="privacy-policy">Privacy Policy</Link>.
              </Label>
              {errors.privacy && <ErrorMessage>{errors.privacy}</ErrorMessage>}
            </FieldWrapper>

            <Button
              disabled={!values.privacy}
              type="submit"
              onClick={e => {
                e.preventDefault()
                handleSubscribe({ values })
              }}
            >
              Iscriviti
            </Button>
          </Container>
        </Form>
      )}
    </Formik>
  )
}
