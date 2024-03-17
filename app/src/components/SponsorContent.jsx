import React from 'react';
 
function SponsorContent(props) {

  return (
    <div>
        <section>
            <p>
                {props.sponsor.email}
            </p> 
        </section>
  </div>
  )

}
 
export default SponsorContent