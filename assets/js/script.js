// Función para enviar correo desde el formulario principal
function sendEmail() {
    let params = {
        from_name: document.getElementById("name").value,
        reply_to: document.getElementById("email").value,
        message: document.getElementById("subject").value + "\n" + document.getElementById("message").value,
    };

    emailjs.send("service_viecicp", "template_ww8fv7u", params)
        .then(() => alert("Your message has been sent. Thank you!"));
}

// Función para enviar correo desde el footer
function sendEmailFooter() {
    let params = {
        from_name: "Nuevo Usuario Registrado",
        reply_to: document.getElementById("email-footer").value,
        message: "Esta persona esta interesada y ha dejado su correo.",
    };

    emailjs.send("service_viecicp", "template_ww8fv7u", params)
        .then(() => alert("Your message has been sent. Thank you!"));
}

// Inicializar EmailJS
emailjs.init('3pzoFb6_KXQMk97Gt');

// Función para enviar correo desde un formulario específico
const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    btn.value = 'Sending...';

    const serviceID = 'default_service';
    const templateID = 'template_ww8fv7u';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.value = 'Send Email';
            alert('Sent!');
        }, (err) => {
            btn.value = 'Send Email';
            alert(JSON.stringify(err));
        });
});
