import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import SectionTitle from '../SectionTitle'

const FormContainer = styled.div`
  width: 100%;
  margin: 1rem auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: stretch;
  * {
    flex-basis: 0;
    flex-grow: 1;
  }
`

const Info = styled.div`
  width: 100%;
`

const Input = styled(Field)`
  width: 100%;
  height: 45px;
  padding-left: 1rem;
  font-weight: 200;
  border: solid 1px ${({ theme }) => theme.navy};
`

const TextArea = styled.div`
  width: 100%;
  min-width: 300px;
  textarea {
    min-height: 228px;
    font-weight: 200;
    border: solid 1px ${({ theme }) => theme.navy};
    width: 100%;
    height: 100%;
    margin-top: 1rem;
    /* padding: 2rem; */
    padding-top: 2rem;
    padding-left: 2rem;
  }

  @media (max-width: 767px) {
    margin: 1rem;
  }
`

const ErrorMessage = styled.p`
  color: red;
  margin: 0;
  margin-left: 1rem;
  font-size: 15px;
`

const FormError = styled.p`
  color: red;
  margin: 0;
  margin-left: 1rem;
  font-size: 15px;
  align-self: flex-end;
`

const FormSuccess = styled.p`
  color: green;
  margin: 0;
  margin-left: 1rem;
  font-size: 15px;
  align-self: flex-end;
`

const FieldWrapper = styled.div`
  margin: 1rem;
  min-width: 200px;
`

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.navy};
  color: white;
  align-self: flex-end;
  padding: 1rem 2rem;
  text-transform: uppercase;
  margin-top: 2rem;
  @media (max-width: 767px) {
    margin-right: 1rem;
    margin-top: 0;
  }
`

const FormWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
`

const Sottotitolo = styled.span`
  font-size: 18px;
  margin: 1rem;
  line-height: 2;
`
const Checkbox = styled(Field)``

const Label = styled.label`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme }) => theme.navy};
  font-size: 15px;
  a {
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.navy};
    text-decoration: underline;
    white-space: nowrap;
    &:visited {
      color: white;
      text-decoration: underline;
    }
  }
  * {
    flex-grow: 0;
  }
`

const Right = styled.div``

export default function ContactForm({ titolo, sottotitolo }) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const sendEmail = (values, { resetForm }) => {
    const fullName = `${values.firstName} ${values.lastName}`

    const myHeaders = new Headers()
    myHeaders.append(
      'Authorization',
      `Basic ${process.env.GATSBY_MAILGUN_API_KEY}`,
    )

    const formdata = new FormData()
    formdata.append(
      'from',
      `${fullName} <mailgun@sandbox9c63a32f8a364a37af7d4242e40a4453.mailgun.org>`,
    )
    formdata.append('to', 'matteocarpi@hacari.com')
    formdata.append('subject', `Messaggio sul Sito CMB da parte di ${fullName}`)
    formdata.append('text', values.content)
    formdata.append('h:Reply-To', `${fullName} <${values.email}>`)
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    }

    fetch(
      `https://api.mailgun.net/v3/${process.env.GATSBY_MAILGUN_DOMAIN}/messages`,
      requestOptions,
    )
      .then(response => {
        if (response.status === 200) {
          setError(false)
          resetForm()
          setSuccess(true)
        } else {
          setSuccess(false)
          setError(true)
        }
      })
      .catch(() => setError(true))
  }

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    content: '',
    privacy: false,
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Campo Obbligatorio'),
    lastName: Yup.string().required('Campo Obbligatorio'),
    email: Yup.string()
      .email('Formato email non valido')
      .required('Campo Obbligatorio'),
    company: Yup.string(),
    content: Yup.string().required('Campo Obbligatorio'),
    privacy: Yup.boolean().oneOf([true], 'Campo Obbligatorio'),
  })

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={sendEmail}
      validateOnBlur
    >
      {({ errors, touched }) => (
        <Form>
          <FormWrapper>
            <SectionTitle longest>{titolo}</SectionTitle>

            <Sottotitolo>{sottotitolo}</Sottotitolo>
            <FormContainer>
              <Info>
                <FieldWrapper>
                  <Input name="firstName" placeholder="Nome" />
                  {touched.firstName && errors.firstName && (
                    <ErrorMessage>{errors.firstName}</ErrorMessage>
                  )}
                </FieldWrapper>

                <FieldWrapper>
                  <Input name="lastName" placeholder="Cognome" />
                  {errors.lastName && touched.lastName && (
                    <ErrorMessage>{errors.lastName}</ErrorMessage>
                  )}
                </FieldWrapper>

                <FieldWrapper>
                  <Input name="email" type="email" placeholder="Mail" />
                  {errors.email && touched.email && (
                    <ErrorMessage>{errors.email}</ErrorMessage>
                  )}
                </FieldWrapper>

                <FieldWrapper>
                  <Input name="company" placeholder="Azienda" />
                  {errors.company && touched.company && (
                    <ErrorMessage>{errors.company}</ErrorMessage>
                  )}
                </FieldWrapper>
              </Info>
              <Right>
                <TextArea>
                  <Field name="content" as="textarea" placeholder="Messaggio" />
                </TextArea>
                {errors.content && touched.content && (
                  <ErrorMessage>{errors.firstName}</ErrorMessage>
                )}

                <FieldWrapper>
                  <Label htmlfor="privacy">
                    <Checkbox type="checkbox" name="privacy" />
                    Accetto la<Link to="privacy-policy">Privacy Policy</Link>.
                  </Label>
                  {errors.privacy && (
                    <ErrorMessage>{errors.privacy}</ErrorMessage>
                  )}
                </FieldWrapper>
              </Right>
            </FormContainer>

            <SubmitButton type="submit">Invio</SubmitButton>
            {success && (
              <FormSuccess>
                Grazie! Ti risponderemo non appena possibile
              </FormSuccess>
            )}
            {error && (
              <FormError>
                Qualcosa è andato storto, riprova più tardi per favore
              </FormError>
            )}
          </FormWrapper>
        </Form>
      )}
    </Formik>
  )
}
