document.addEventListener('DOMContentLoaded', function() {
    
    // =================================================================
    // ===               DARK MODE FUNCTIONALITY                     ===
    // =================================================================
    
    function initializeDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const body = document.body;
        const icon = darkModeToggle.querySelector('.icon');
        const text = darkModeToggle.querySelector('.text');
        
        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', currentTheme);
        
        // Update button text and icon based on current theme
        function updateToggleButton() {
            if (body.getAttribute('data-theme') === 'dark') {
                icon.textContent = '☀️';
                text.textContent = 'Modo Día';
            } else {
                icon.textContent = '🌙';
                text.textContent = 'Modo Noche';
            }
        }
        
        // Toggle theme function
        function toggleTheme() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleButton();
        }
        
        // Add click event listener
        darkModeToggle.addEventListener('click', toggleTheme);
        
        // Initialize button state
        updateToggleButton();
    }
    
    // =================================================================
    // ===               FORM DYNAMIC FIELDS                         ===
    // =================================================================

    function setupDynamicFields() {
        const programTypeSelect = document.getElementById('programType');
        if (!programTypeSelect) return;
        
        const commonFields = document.getElementById('commonFields');
        const postgraduateQuestions = document.getElementById('postgraduateQuestions');
        const undergraduateQuestions = document.getElementById('undergraduateQuestions');
        const finalFields = document.getElementById('finalFields');

        // NUEVA FUNCIÓN para activar/desactivar 'required' en los campos
        function setRequired(section, isRequired) {
            const fields = section.querySelectorAll('input, textarea, select');
            fields.forEach(field => {
                // Solo modifica los campos que originalmente tienen el atributo required
                if (field.hasAttribute('required')) {
                   field.required = isRequired;
                }
            });
        }

        function toggleQuestionVisibility() {
            const selectedType = programTypeSelect.value;
            
            [commonFields, postgraduateQuestions, undergraduateQuestions, finalFields].forEach(el => el.style.display = 'none');
            
            // Desactivamos la obligatoriedad de todas las secciones específicas primero
            setRequired(postgraduateQuestions, false);
            setRequired(undergraduateQuestions, false);

            if (selectedType) {
                commonFields.style.display = 'block';
                finalFields.style.display = 'block';
                
                if (selectedType === 'Maestría') {
                    postgraduateQuestions.style.display = 'block';
                    setRequired(postgraduateQuestions, true); // ACTIVAMOS required para posgrado
                } else if (selectedType === 'Pregrado') {
                    undergraduateQuestions.style.display = 'block';
                    setRequired(undergraduateQuestions, true); // ACTIVAMOS required para pregrado
                }
            }
        }
        programTypeSelect.addEventListener('change', toggleQuestionVisibility);
        toggleQuestionVisibility();
    }

    // =================================================================
    // ===               ADVISOR FROM URL                            ===
    // =================================================================

    function setAdvisorFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const advisorName = urlParams.get('asesor');
        if (advisorName) {
            const advisorField = document.getElementById('asesorField');
            if (advisorField) advisorField.value = advisorName;
        }
    }

    // =================================================================
    // ===               FORM VALIDATION                             ===
    // =================================================================

    function setupFormValidation() {
        const submitButton = document.getElementById('submit-button');
        if (!submitButton) return;
        
        // Function to get missing fields with user-friendly names
        function getMissingFields() {
            const programType = document.getElementById('programType').value;
            const missingFields = [];
            
            if (!programType) {
                missingFields.push('Tipo de programa');
                return missingFields;
            }
            
            // Common required fields
            const commonFields = {
                'fullName': 'Nombre y apellido completo',
                'age': 'Edad',
                'email': 'Correo electrónico',
                'countryCode': 'Código de país',
                'phone': 'Número de teléfono',
                'nationality': 'Nacionalidad'
            };
            
            // Program-specific required fields
            let programFields = {};
            if (programType === 'Maestría') {
                programFields = {
                    'undergradMajor': 'Carrera de pregrado',
                    'undergradGpa': 'Nota promedio de pregrado (GPA)',
                    'masterSpecialty': 'Especialidad que deseas cursar',
                    'prevPostgrad': '¿Has cursado algún posgrado previamente?'
                };
            } else if (programType === 'Pregrado') {
                programFields = {
                    'highSchool': 'Colegio de procedencia',
                    'highSchoolGpa': 'Nota promedio de secundaria',
                    'hasIB': '¿Tienes Bachillerato Internacional (IB)?',
                    'intendedMajor': 'Carrera a la que deseas aplicar'
                };
            }
            
            // Final required fields (universities and countries are now optional)
            const finalFields = {
                'englishLevel': 'Nivel de inglés',
                'openToLanguages': '¿Dispuesto a estudiar en otros idiomas?',
                'budget': 'Presupuesto aproximado'
            };
            
            const allFields = {...commonFields, ...programFields, ...finalFields};
            
            // Check each required field
            for (const [fieldName, fieldLabel] of Object.entries(allFields)) {
                if (fieldName === 'budget') {
                    // Special handling for budget checkboxes
                    const budgetCheckboxes = document.querySelectorAll('input[name="budget[]"]');
                    const isBudgetSelected = Array.from(budgetCheckboxes).some(checkbox => checkbox.checked);
                    if (!isBudgetSelected) {
                        missingFields.push(fieldLabel);
                    }
                } else if (fieldName === 'prevPostgrad' || fieldName === 'hasIB' || fieldName === 'openToLanguages') {
                    // Special handling for radio buttons
                    const radioButtons = document.querySelectorAll(`input[name="${fieldName}"]`);
                    const isRadioSelected = Array.from(radioButtons).some(radio => radio.checked);
                    if (!isRadioSelected) {
                        missingFields.push(fieldLabel);
                    }
                } else if (fieldName === 'countryCode') {
                    // Special handling for country code - must be complete
                    const countryCodeField = document.getElementById(fieldName);
                    if (!countryCodeField || !countryCodeField.value || countryCodeField.value.trim() === '') {
                        missingFields.push(fieldLabel);
                    }
                } else {
                    // Regular input fields
                    const field = document.getElementById(fieldName);
                    if (field && (!field.value || field.value.trim() === '')) {
                        missingFields.push(fieldLabel);
                    }
                }
            }
            
            return missingFields;
        }
        
        // Function to show validation alert
        function showValidationAlert() {
            const missingFields = getMissingFields();
            if (missingFields.length > 0) {
                const programType = document.getElementById('programType').value;
                const programName = programType === 'Maestría' ? 'Posgrado (Maestría/Doctorado)' : 
                                  programType === 'Pregrado' ? 'Pregrado (Licenciatura/Grado)' : 'Programa';
                
                let alertMessage = `Para completar tu aplicación de ${programName}, necesitas llenar los siguientes campos obligatorios:\n\n`;
                missingFields.forEach((field, index) => {
                    alertMessage += `${index + 1}. ${field}\n`;
                });
                alertMessage += '\nPor favor, completa estos campos para continuar.';
                
                alert(alertMessage);
                return false;
            }
            return true;
        }
        
        // Function to update button state
        function updateButtonState() {
            const missingFields = getMissingFields();
            const hasErrors = missingFields.length > 0;
            
            // Always enable the button, but show different text based on validation
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            
            if (hasErrors) {
                submitButton.textContent = 'Enviar mi Aplicación ⚠️';
            } else {
                submitButton.textContent = 'Enviar mi Aplicación 🚀';
            }
        }
        
        // Add event listeners to all form inputs
        const form = document.getElementById('applicationForm');
        if (form) {
            form.addEventListener('input', updateButtonState);
            form.addEventListener('change', updateButtonState);
        }
        
        // Initial validation
        updateButtonState();
        
        // Return the validation function for use in form submission
        return showValidationAlert;
    }

    // =================================================================
    // ===               FILE VALIDATION                             ===
    // =================================================================

    function setupFileValidation() {
        const fileInput = document.getElementById('files');
        if (!fileInput) return;
        const fileListEl = document.getElementById('fileList');
        const maxFiles = 5;
        const maxSizePerFile = 10 * 1024 * 1024; // 10MB in bytes

        // Mantener la lista actual en memoria para poder añadir sin reemplazar
        let currentFiles = Array.from(fileInput.files || []);

        function renderFileList(files) {
            fileListEl.innerHTML = '';
            files.forEach((file, idx) => {
                const li = document.createElement('li');
                const nameSpan = document.createElement('span');
                nameSpan.className = 'file-name';
                nameSpan.textContent = file.name;

                const removeBtn = document.createElement('button');
                removeBtn.type = 'button';
                removeBtn.className = 'remove-file';
                removeBtn.textContent = 'Eliminar';
                removeBtn.addEventListener('click', function() {
                    removeFileAtIndex(idx);
                });

                li.appendChild(nameSpan);
                li.appendChild(removeBtn);
                fileListEl.appendChild(li);
            });
        }

        function setInputFiles(fileInput, filesArray) {
            const dataTransfer = new DataTransfer();
            filesArray.forEach(f => dataTransfer.items.add(f));
            fileInput.files = dataTransfer.files;
        }

        function removeFileAtIndex(index) {
            currentFiles.splice(index, 1);
            setInputFiles(fileInput, currentFiles);
            renderFileList(currentFiles);
        }

        fileInput.addEventListener('change', function() {
            const newFiles = Array.from(this.files || []);

            // If user cancelled dialog, newFiles will be empty — do nothing
            if (newFiles.length === 0) return;

            // Combine previous and new, avoiding duplicates (name+size)
            const combined = currentFiles.slice();
            newFiles.forEach(nf => {
                const exists = combined.some(cf => cf.name === nf.name && cf.size === nf.size && cf.lastModified === nf.lastModified);
                if (!exists) combined.push(nf);
            });

            // Enforce size limit: remove offending files and notify
            for (let i = 0; i < combined.length; i++) {
                if (combined[i].size > maxSizePerFile) {
                    const fileSizeMB = (combined[i].size / (1024 * 1024)).toFixed(1);
                    alert(`El archivo "${combined[i].name}" es demasiado grande (${fileSizeMB}MB). El tamaño máximo permitido es 10MB.`);
                    combined.splice(i, 1);
                    i--;
                }
            }

            // Enforce max files
            if (combined.length > maxFiles) {
                alert(`Solo puedes subir máximo ${maxFiles} archivos. Se guardarán los primeros ${maxFiles}.`);
                combined.splice(maxFiles); // keep first maxFiles
            }

            // Save and render
            currentFiles = combined;
            setInputFiles(this, currentFiles);
            renderFileList(currentFiles);
        });
    }

    // =================================================================
    // ===               COUNTRY CODE DROPDOWN                       ===
    // =================================================================

    function setupCountryCodeDropdown() {
        // Ahora usamos un <select id="countryCode"> en vez del dropdown personalizado.
        const countrySelect = document.getElementById('countryCode');
        if (!countrySelect) return;

        // Intentar prefijar la selección desde localStorage si existe
        try {
            const saved = localStorage.getItem('countryCode');
            if (saved) {
                const option = countrySelect.querySelector(`option[value="${saved}"]`);
                if (option) option.selected = true;
            }
        } catch (e) {}

        // Guardar selección en localStorage para próxima vez
        countrySelect.addEventListener('change', function() {
            try { localStorage.setItem('countryCode', this.value); } catch (e) {}
        });
    }

    // =================================================================
    // ===               FORM SUBMISSION                             ===
    // =================================================================

    function handleFormSubmission(validationFunction) {
        const form = document.getElementById('applicationForm');
        if (!form) return;
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            // Use the validation function to check required fields
            if (!validationFunction()) {
                return; // Stop submission if validation fails
            }
            
            const submitButton = document.getElementById('submit-button');
            const messageDiv = document.getElementById('form-message');
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando... ⏳';
            messageDiv.style.display = 'none';
            messageDiv.className = '';

            // Mostrar modal de carga
            const loadingModal = document.getElementById('loadingModal');
            if (loadingModal) {
                loadingModal.style.display = 'flex';
                loadingModal.setAttribute('aria-hidden', 'false');
            }
            const formData = new FormData(form);

            // Asegurar que se envíe el código de país y que el teléfono incluya el prefijo.
            try {
                const countryInput = document.getElementById('countryCode');
                const phoneInput = document.getElementById('phone');

                let ccVal = countryInput ? countryInput.value.trim() : '';

                // Si el usuario escribió el nombre del país en lugar del código, intentar resolverlo
                if (countryInput && ccVal && !/^[+\d]/.test(ccVal)) {
                    const countryOptions = document.querySelectorAll('.country-option');
                    const search = ccVal.toLowerCase();
                    for (let opt of countryOptions) {
                        if (opt.textContent.toLowerCase().includes(search)) {
                            const dv = opt.getAttribute('data-value');
                            if (dv) {
                                ccVal = dv;
                                break;
                            }
                        }
                    }
                }

                // Si tenemos un código válido, asegurarlo en formData
                if (ccVal) {
                    formData.set('countryCode', ccVal);
                }

                // Normalizar el teléfono: NO duplicar el countryCode en el campo phone.
                // Envíaremos `countryCode` en su campo separado y `phone` contendrá sólo el número local (sin prefijo).
                if (phoneInput) {
                    let phoneVal = phoneInput.value.trim();
                    if (phoneVal) {
                        // Normalizar espacios
                        phoneVal = phoneVal.replace(/\s+/g, ' ').trim();

                        if (ccVal) {
                            // Si el usuario incluyó el código en el teléfono, eliminarlo para evitar duplicados.
                            try {
                                const ccDigits = ccVal.replace(/\D/g, ''); // solo dígitos del código
                                if (ccDigits) {
                                    const prefixRe = new RegExp('^\\+?' + ccDigits + '[\\s-]*');
                                    phoneVal = phoneVal.replace(prefixRe, '');
                                }
                            } catch (e) {
                                // si falla el regex, no bloquear
                            }

                            // Quitar ceros iniciales locales
                            phoneVal = phoneVal.replace(/^0+/, '');

                            // Asegurar que enviamos el countryCode por separado
                            formData.set('countryCode', ccVal);
                            formData.set('phone', phoneVal);
                        } else {
                            // Si no hay countryCode seleccionado, enviamos el teléfono tal cual
                            formData.set('phone', phoneVal);
                        }
                    }
                }
            } catch (err) {
                // Si algo falla aquí, no queremos bloquear el envío — lo registramos y continuamos
                console.warn('No se pudo normalizar countryCode/phone antes de enviar:', err);
            }
            const formAction = form.action;
            try {
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                });
                // Intentamos parsear JSON seguro (no todos los endpoints devuelven JSON)
                let json = {};
                try {
                    json = await response.json();
                } catch (err) {
                    // Si no es JSON, lo dejamos vacío y seguiremos con response.ok
                }

                if (response.ok && json && json.success === true) {
                    // Redirigir a página de éxito cuando la API confirme success=true
                    window.location.href = 'success.html';
                    return;
                } else if (response.ok) {
                    // Respuesta OK pero no indicó success === true; mostramos mensaje y reseteamos
                    messageDiv.textContent = (json && json.message) ? json.message : '¡Formulario enviado con éxito! Gracias por tu postulación. ✅';
                    messageDiv.className = 'success';
                    form.reset();
                    // Volvemos a llamar a la lógica para ocultar todo tras el reseteo
                    document.getElementById('programType').dispatchEvent(new Event('change'));
                } else {
                    throw new Error(`Error del servidor: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                messageDiv.textContent = '❌ Hubo un problema al enviar el formulario. Por favor, revisa tu conexión e inténtalo de nuevo.';
                messageDiv.className = 'error';
            } finally {
                // Ocultar modal de carga
                const loadingModal = document.getElementById('loadingModal');
                if (loadingModal) {
                    loadingModal.style.display = 'none';
                    loadingModal.setAttribute('aria-hidden', 'true');
                }

                submitButton.disabled = false;
                submitButton.textContent = 'Enviar mi Aplicación 🚀';
            }
        });
    }

    // =================================================================
    // ===               INITIALIZE ALL FUNCTIONS                    ===
    // =================================================================

    initializeDarkMode();
    setAdvisorFromURL();
    setupDynamicFields();
    const validationFunction = setupFormValidation();
    handleFormSubmission(validationFunction);
    setupCountryCodeDropdown();
    setupFileValidation();
});
