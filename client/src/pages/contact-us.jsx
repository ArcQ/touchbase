import React from 'react';
import { useForm } from 'react-hook-form';
import ButtonPrimary from 'components/atoms/ButtonPrimary';
import { FormField, FormTextArea } from 'components/atoms/FormFields';

function ContactUs(props) {
  const { register, handleSubmit, watch, formState } = useForm();
  // TODO temp
  const dispatch = () => {};
  const router = {};
  const onSubmit = data => resetPassword(data, dispatch, props, router);

  return (
    <section>
      <div className="container items-center px-5 py-12 lg:px-20">
        <form className="flex flex-col w-full p-10 px-8 pt-6 mx-auto my-6 mb-4 bg-white border border-gray-200 rounded-lg shadow-2xl transition duration-500 ease-in-out transform lg:w-1/2">
          <h1 className="mt-4 text-2xl font-semibold text-black tracking-ringtighter sm:text-3xl title-font">
            Contact Us
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Let us know your inquiry and we will get back to you as soon as possible.
          </p>
          <div className="flex flex-wrap mt-3 -mx-3">
            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
              <FormField
                type="email"
                formState={formState}
                label="Email"
                name="email"
                input={{ ...register('email', { required: true }) }}
                errors={formState.errors}
                placeholder="example@mail.com"
              />
            </div>
            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
              <FormField
                type="date"
                formState={formState}
                label="Date"
                name="date"
                input={{ ...register('date', { required: true }) }}
                errors={formState.errors}
                placeholder="MM/DD/YYYY"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 mb-6 md:mb-0">
              <FormField
                type="text"
                formState={formState}
                label="Subject"
                name="subject"
                input={{ ...register('subject', { required: true }) }}
                errors={formState.errors}
                placeholder="eg. Business Inquiry"
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3">
              <FormTextArea
                type="text"
                formState={formState}
                label="Description"
                name="description"
                input={{ ...register('description', { required: true }) }}
                errors={formState.errors}
                placeholder="Message"
              />
            </div>
          </div>

          <ButtonPrimary text="Submit" />
        </form>
      </div>
    </section>
  );
}

export default ContactUs;
