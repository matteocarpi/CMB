import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Formik, Field } from 'formik'
import { Link } from 'gatsby'
import * as Yup from 'yup'
import addToMailChimp from 'gatsby-plugin-mailchimp'

import Loader from 'react-loader-spinner'

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

const Message = styled.p`
  color: white;
  margin: 0;
  margin-right: 1rem;
  font-size: 15px;

  a {
    color: white;
    text-decoration: underline;
  }
`

export default function NewsletterForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const [done, setDone] = useState(false)

  const initialValues = {
    name: '',
    email: '',
    privacy: false,
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Campo Obbligatorio'),
    lastName: Yup.string().required('Campo Obbligatorio'),
    email: Yup.string()
      .email('Formato email non valido')
      .required('Campo Obbligatorio'),
    privacy: Yup.boolean().required('Campo Obbligatorio'),
  })

  const handleSubscribe = ({ values }) => {
    setLoading(true)

    addToMailChimp(values.email, {
      FNAME: values.firstName,
      LNAME: values.lastName,
    })
      .then(({ msg }) => {
        setLoading(false)
        setDone(true)
        setMessage(msg)
      })
      .catch(({ msg }) => {
        setError(true)
        setMessage(msg)
      })
  }

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
          <Container>
            {error && <Message dangerouslySetInnerHTML={{ __html: message }} />}

            {done && <Message dangerouslySetInnerHTML={{ __html: message }} />}

            {loading && (
              <Loader type="TailSpin" color="#ffffff" width={50} height={50} />
            )}

            {!loading && !done && !error && (
              <>
                <FieldWrapper>
                  <Input name="firstName" placeholder="Nome" />
                  {touched.firstName && errors.firstName && (
                    <ErrorMessage>{errors.firstName}</ErrorMessage>
                  )}
                </FieldWrapper>
                <FieldWrapper>
                  <Input name="lastName" placeholder="Cognome" />
                  {touched.lastName && errors.lastName && (
                    <ErrorMessage>{errors.lastName}</ErrorMessage>
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
                    Accetto la<Link to="https://www.iubenda.com/privacy-policy/728053">Privacy Policy</Link>.
                  </Label>
                  {errors.privacy && (
                    <ErrorMessage>{errors.privacy}</ErrorMessage>
                  )}
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
              </>
            )}
          </Container>
        </Form>
      )}
    </Formik>
  )
}
