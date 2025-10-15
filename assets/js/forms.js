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
                // Solo modificamos los que originalmente eran 'required'
                // para no añadirlo a campos opcionales.
                if (field.hasAttribute('required') || isRequired) {
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
                
                if (selectedType === 'posgrado') {
                    postgraduateQuestions.style.display = 'block';
                    setRequired(postgraduateQuestions, true); // ACTIVAMOS required para posgrado
                } else if (selectedType === 'pregrado') {
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
            if (programType === 'posgrado') {
                programFields = {
                    'undergradMajor': 'Carrera de pregrado',
                    'undergradGpa': 'Nota promedio de pregrado (GPA)',
                    'masterSpecialty': 'Especialidad que deseas cursar',
                    'prevPostgrad': '¿Has cursado algún posgrado previamente?',
                    'workExperience': 'Experiencia laboral'
                };
            } else if (programType === 'pregrado') {
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
                const programName = programType === 'posgrado' ? 'Posgrado (Maestría/Doctorado)' : 
                                  programType === 'pregrado' ? 'Pregrado (Licenciatura/Grado)' : 'Programa';
                
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
        
        fileInput.addEventListener('change', function() {
            const files = this.files;
            const maxFiles = 5;
            const maxSizePerFile = 10 * 1024 * 1024; // 10MB in bytes
            
            // Check number of files
            if (files.length > maxFiles) {
                alert(`Solo puedes subir máximo ${maxFiles} archivos. Has seleccionado ${files.length} archivos.`);
                this.value = '';
                return;
            }
            
            // Check file sizes
            for (let i = 0; i < files.length; i++) {
                if (files[i].size > maxSizePerFile) {
                    const fileSizeMB = (files[i].size / (1024 * 1024)).toFixed(1);
                    alert(`El archivo "${files[i].name}" es demasiado grande (${fileSizeMB}MB). El tamaño máximo permitido es 10MB.`);
                    this.value = '';
                    return;
                }
            }
            
            // Show success message if files are valid
            if (files.length > 0) {
                const totalSizeMB = Array.from(files).reduce((total, file) => total + file.size, 0) / (1024 * 1024);
                console.log(`Archivos válidos: ${files.length} archivos, tamaño total: ${totalSizeMB.toFixed(1)}MB`);
            }
        });
    }

    // =================================================================
    // ===               COUNTRY CODE DROPDOWN                       ===
    // =================================================================

    function setupCountryCodeDropdown() {
        const countryInput = document.getElementById('countryCode');
        const countryDropdown = document.getElementById('countryDropdown');
        const countryOptions = countryDropdown.querySelectorAll('.country-option');
        
        if (!countryInput || !countryDropdown) return;
        
        // Show dropdown on focus/click
        countryInput.addEventListener('focus', function() {
            countryDropdown.classList.add('show');
            filterOptions('');
        });
        
        countryInput.addEventListener('click', function() {
            countryDropdown.classList.add('show');
            filterOptions('');
        });
        
        // Filter options as user types
        countryInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterOptions(searchTerm);
            countryDropdown.classList.add('show');
        });
        
        // Handle option selection
        countryOptions.forEach(option => {
            option.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                countryInput.value = value;
                countryDropdown.classList.remove('show');
            });
        });
        
        // Hide dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!countryInput.contains(event.target) && !countryDropdown.contains(event.target)) {
                countryDropdown.classList.remove('show');
            }
        });
        
        // Filter function
        function filterOptions(searchTerm) {
            countryOptions.forEach(option => {
                const text = option.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    option.classList.remove('hidden');
                } else {
                    option.classList.add('hidden');
                }
            });
        }
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
            const formData = new FormData(form);
            const formAction = form.action;
            try {
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    messageDiv.textContent = '¡Formulario enviado con éxito! Gracias por tu postulación. ✅';
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
