document.addEventListener('DOMContentLoaded', function() {

    // =================================================================
    // ===               DARK MODE FUNCTIONALITY                     ===
    // =================================================================

    function initializeDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const body = document.body;
        const icon = darkModeToggle.querySelector('.icon');
        const text = darkModeToggle.querySelector('.text');

        const currentTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', currentTheme);

        function updateToggleButton() {
            if (body.getAttribute('data-theme') === 'dark') {
                icon.textContent = '☀️';
                text.textContent = 'Modo Día';
            } else {
                icon.textContent = '🌙';
                text.textContent = 'Modo Noche';
            }
        }

        function toggleTheme() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleButton();
        }

        darkModeToggle.addEventListener('click', toggleTheme);
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

        function setRequired(section, isRequired) {
            const fields = section.querySelectorAll('input, textarea, select');
            fields.forEach(field => {
                if (field.hasAttribute('required')) {
                   field.required = isRequired;
                }
            });
        }

        function toggleQuestionVisibility() {
            const selectedType = programTypeSelect.value;

            [commonFields, postgraduateQuestions, undergraduateQuestions, finalFields].forEach(el => el.style.display = 'none');

            setRequired(postgraduateQuestions, false);
            setRequired(undergraduateQuestions, false);

            if (selectedType) {
                commonFields.style.display = 'block';
                finalFields.style.display = 'block';

                if (selectedType === 'Maestría') {
                    postgraduateQuestions.style.display = 'block';
                    setRequired(postgraduateQuestions, true);
                } else if (selectedType === 'Pregrado') {
                    undergraduateQuestions.style.display = 'block';
                    setRequired(undergraduateQuestions, true);
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
                    'targetProgram': 'Programa al que deseas aplicar'
                };
            } else if (programType === 'Pregrado') {
                programFields = {
                    'highSchool': 'Colegio de procedencia',
                    'highSchoolGpa': 'Nota promedio de secundaria',
                    'hasIB': '¿Tienes Bachillerato Internacional (IB)?',
                    'intendedMajor': 'Carrera a la que deseas aplicar'
                };
            }

            // Final required fields for document advisory
            const finalFields = {
                'docsNeeded[]': 'Documentos que necesitas (al menos uno)',
                'applicationDeadline': 'Fecha límite de aplicación',
                'applicationCount': 'Número de universidades a las que aplicarás',
                'englishLevel': 'Nivel de inglés',
                'hasDraft': '¿Tienes un borrador de algún documento?'
            };

            const regularFields = {...commonFields, ...programFields};

            // Check regular text/select fields
            for (const [fieldName, fieldLabel] of Object.entries(regularFields)) {
                if (fieldName === 'countryCode') {
                    const field = document.getElementById(fieldName);
                    if (!field || !field.value || field.value.trim() === '') {
                        missingFields.push(fieldLabel);
                    }
                } else {
                    const field = document.getElementById(fieldName);
                    if (field && (!field.value || field.value.trim() === '')) {
                        missingFields.push(fieldLabel);
                    }
                }
            }

            // Check final fields with special handling
            for (const [fieldName, fieldLabel] of Object.entries(finalFields)) {
                if (fieldName === 'docsNeeded[]') {
                    const checkboxes = document.querySelectorAll('input[name="docsNeeded[]"]');
                    const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
                    if (!anyChecked) missingFields.push(fieldLabel);
                } else if (fieldName === 'hasDraft' || fieldName === 'hasIB') {
                    const radios = document.querySelectorAll(`input[name="${fieldName}"]`);
                    const anySelected = Array.from(radios).some(r => r.checked);
                    if (!anySelected) missingFields.push(fieldLabel);
                } else {
                    const field = document.getElementById(fieldName);
                    if (field && (!field.value || field.value.trim() === '')) {
                        missingFields.push(fieldLabel);
                    }
                }
            }

            return missingFields;
        }

        function showValidationAlert() {
            const missingFields = getMissingFields();
            if (missingFields.length > 0) {
                let alertMessage = 'Para enviar tu solicitud, completa los siguientes campos obligatorios:\n\n';
                missingFields.forEach((field, index) => {
                    alertMessage += `${index + 1}. ${field}\n`;
                });
                alertMessage += '\nPor favor, completa estos campos para continuar.';
                alert(alertMessage);
                return false;
            }
            return true;
        }

        function updateButtonState() {
            const missingFields = getMissingFields();
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            submitButton.textContent = missingFields.length > 0
                ? 'Enviar mi Solicitud ⚠️'
                : 'Enviar mi Solicitud 🚀';
        }

        const form = document.getElementById('applicationForm');
        if (form) {
            form.addEventListener('input', updateButtonState);
            form.addEventListener('change', updateButtonState);
        }

        updateButtonState();
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
        const maxSizePerFile = 10 * 1024 * 1024; // 10MB
        const allowedTypes = ['application/pdf', 'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain'];
        const allowedExts = ['.pdf', '.doc', '.docx', '.txt'];

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

        function setInputFiles(input, filesArray) {
            const dataTransfer = new DataTransfer();
            filesArray.forEach(f => dataTransfer.items.add(f));
            input.files = dataTransfer.files;
        }

        function removeFileAtIndex(index) {
            currentFiles.splice(index, 1);
            setInputFiles(fileInput, currentFiles);
            renderFileList(currentFiles);
        }

        function isAllowedFile(file) {
            if (allowedTypes.includes(file.type)) return true;
            const ext = '.' + file.name.split('.').pop().toLowerCase();
            return allowedExts.includes(ext);
        }

        fileInput.addEventListener('change', function() {
            const newFiles = Array.from(this.files || []);
            if (newFiles.length === 0) return;

            const combined = currentFiles.slice();
            newFiles.forEach(nf => {
                if (!isAllowedFile(nf)) {
                    alert(`El archivo "${nf.name}" no es un tipo permitido. Solo se aceptan PDF, DOC, DOCX y TXT.`);
                    return;
                }
                const exists = combined.some(cf => cf.name === nf.name && cf.size === nf.size && cf.lastModified === nf.lastModified);
                if (!exists) combined.push(nf);
            });

            for (let i = 0; i < combined.length; i++) {
                if (combined[i].size > maxSizePerFile) {
                    const fileSizeMB = (combined[i].size / (1024 * 1024)).toFixed(1);
                    alert(`El archivo "${combined[i].name}" es demasiado grande (${fileSizeMB}MB). El tamaño máximo es 10MB.`);
                    combined.splice(i, 1);
                    i--;
                }
            }

            if (combined.length > maxFiles) {
                alert(`Solo puedes subir máximo ${maxFiles} archivos. Se guardarán los primeros ${maxFiles}.`);
                combined.splice(maxFiles);
            }

            currentFiles = combined;
            setInputFiles(this, currentFiles);
            renderFileList(currentFiles);
        });
    }

    // =================================================================
    // ===               COUNTRY CODE DROPDOWN                       ===
    // =================================================================

    function setupCountryCodeDropdown() {
        const countrySelect = document.getElementById('countryCode');
        if (!countrySelect) return;

        try {
            const saved = localStorage.getItem('countryCode');
            if (saved) {
                const option = countrySelect.querySelector(`option[value="${saved}"]`);
                if (option) option.selected = true;
            }
        } catch (e) {}

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

            if (!validationFunction()) return;

            const submitButton = document.getElementById('submit-button');
            const messageDiv = document.getElementById('form-message');
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando... ⏳';
            messageDiv.style.display = 'none';
            messageDiv.className = '';

            const loadingModal = document.getElementById('loadingModal');
            if (loadingModal) {
                loadingModal.style.display = 'flex';
                loadingModal.setAttribute('aria-hidden', 'false');
            }
            const formData = new FormData(form);

            try {
                const countryInput = document.getElementById('countryCode');
                const phoneInput = document.getElementById('phone');
                let ccVal = countryInput ? countryInput.value.trim() : '';

                if (ccVal) {
                    formData.set('countryCode', ccVal);
                }

                if (phoneInput) {
                    let phoneVal = phoneInput.value.trim();
                    if (phoneVal) {
                        phoneVal = phoneVal.replace(/\s+/g, ' ').trim();
                        if (ccVal) {
                            try {
                                const ccDigits = ccVal.replace(/\D/g, '');
                                if (ccDigits) {
                                    const prefixRe = new RegExp('^\\+?' + ccDigits + '[\\s-]*');
                                    phoneVal = phoneVal.replace(prefixRe, '');
                                }
                            } catch (e) {}
                            phoneVal = phoneVal.replace(/^0+/, '');
                            formData.set('countryCode', ccVal);
                            formData.set('phone', phoneVal);
                        } else {
                            formData.set('phone', phoneVal);
                        }
                    }
                }
            } catch (err) {
                console.warn('No se pudo normalizar countryCode/phone antes de enviar:', err);
            }

            const formAction = form.action;
            try {
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                });
                let json = {};
                try { json = await response.json(); } catch (err) {}

                if (response.ok && json && json.success === true) {
                    window.location.href = 'success.html';
                    return;
                } else if (response.ok) {
                    messageDiv.textContent = (json && json.message) ? json.message : '¡Solicitud enviada con éxito! Gracias, nos pondremos en contacto pronto. ✅';
                    messageDiv.className = 'success';
                    form.reset();
                    document.getElementById('programType').dispatchEvent(new Event('change'));
                } else {
                    throw new Error(`Error del servidor: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                messageDiv.textContent = '❌ Hubo un problema al enviar la solicitud. Por favor, revisa tu conexión e inténtalo de nuevo.';
                messageDiv.className = 'error';
            } finally {
                if (loadingModal) {
                    loadingModal.style.display = 'none';
                    loadingModal.setAttribute('aria-hidden', 'true');
                }
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar mi Solicitud 🚀';
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
