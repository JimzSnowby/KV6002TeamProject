import React from 'react';
 
function NewsletterContent(props) {

  return (
    <div>
        <section>
            <p>
                {props.newsletter.email}
            </p> 
        </section>
  </div>
  )

}
 
export default NewsletterContent