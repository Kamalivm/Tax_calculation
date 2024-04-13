let popup = document.getElementById('popup');

        function openPopup() {
            popup.classList.add('open-popup');
        }

        function closePopup() {
            popup.classList.remove('open-popup');
        }

        function validateForm() {
            const annualIncome = parseFloat(document.getElementById('annual_income').value);
            const extraIncome = parseFloat(document.getElementById('extra_income').value);
            const ageGroup = document.getElementById('age_group').value;
            const deductions = parseFloat(document.getElementById('deductions').value);

            const fields = ['annual_income', 'extra_income', 'age_group', 'deductions'];
            fields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                field.removeAttribute('data-error');
            });

            let isValid = true;

            if (isNaN(annualIncome) || annualIncome <= 0) {
                document.getElementById('annual_income').setAttribute('data-error', 'Invalid annual income');
                isValid = false;
            }

            if (isNaN(extraIncome) || extraIncome < 0) {
                document.getElementById('extra_income').setAttribute('data-error', 'Invalid extra income');
                isValid = false;
            }

            if (ageGroup === "") {
                document.getElementById('age_group').setAttribute('data-error', 'Age group is required');
                isValid = false;
            }

            if (isNaN(deductions) || deductions < 0) {
                document.getElementById('deductions').setAttribute('data-error', 'Invalid deductions');
                isValid = false;
            }

            if (isValid) {
                calculateTax(annualIncome, extraIncome, ageGroup, deductions);
            }
        }

        function calculateTax(annualIncome, extraIncome, ageGroup, deductions) {
            let overallIncome = annualIncome + extraIncome - deductions;
            let taxAmount = 0;

            if (overallIncome > 800000) {
                if (ageGroup === "below_40") {
                    taxAmount = (overallIncome - 800000) * 0.3;
                } else if (ageGroup === "40_to_60") {
                    taxAmount = (overallIncome - 800000) * 0.4;
                } else if (ageGroup === "above_60") {
                    taxAmount = (overallIncome - 800000) * 0.1;
                }
            }

            document.getElementById('tax_amount').textContent = taxAmount.toFixed(2);

            openPopup(); 
        }