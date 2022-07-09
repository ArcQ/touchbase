import React from 'react';

function WithMobile(ComponentMobile, ComponentDesktop, options) {
  const Wrapped = props => (
    <>
      <div className={`${options?.cssClass || ''} block md:hidden`}>
        <ComponentMobile {...props} />
      </div>
      <div className={`${options?.cssClass || ''} hidden md:block`}>
        <ComponentDesktop {...props} />
      </div>
    </>
  );

  return Wrapped;
}

export default WithMobile;
