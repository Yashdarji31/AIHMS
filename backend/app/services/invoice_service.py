from io import BytesIO

from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

from reportlab.lib.styles import getSampleStyleSheet


def generate_invoice_pdf(billing):
    """
    Generate PDF invoice from billing object
    """

    buffer = BytesIO()

    document = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        title=f"Invoice-{billing.id}",
    )

    styles = getSampleStyleSheet()

    elements = []


    # ===============================
    # HEADER
    # ===============================

    elements.append(
        Paragraph(
            "AIHMS Hospital",
            styles["Title"]
        )
    )

    elements.append(
        Spacer(1, 20)
    )


    elements.append(
        Paragraph(
            "Patient Billing Invoice",
            styles["Heading2"]
        )
    )

    elements.append(
        Spacer(1, 20)
    )


    # ===============================
    # BILL DETAILS
    # ===============================

    data = [
        [
            "Invoice ID",
            str(billing.id)
        ],

        [
            "Appointment ID",
            str(billing.appointment_id)
        ],

        [
            "Patient ID",
            str(billing.patient_id)
        ],

        [
            "Doctor ID",
            str(billing.doctor_id)
        ],

        [
            "Amount",
            f"₹ {billing.amount}"
        ],

        [
            "Payment Status",
            billing.payment_status
        ],

        [
            "Payment Method",
            billing.payment_method
        ],

        [
            "Description",
            billing.description or "-"
        ],

        [
            "Created Date",
            str(billing.created_at)
        ],
    ]


    table = Table(
        data,
        colWidths=[
            150,
            250
        ]
    )


    table.setStyle(
        TableStyle(
            [
                (
                    "GRID",
                    (0,0),
                    (-1,-1),
                    0.5,
                    None
                ),

                (
                    "VALIGN",
                    (0,0),
                    (-1,-1),
                    "TOP"
                ),

                (
                    "PADDING",
                    (0,0),
                    (-1,-1),
                    8
                ),
            ]
        )
    )


    elements.append(table)


    elements.append(
        Spacer(1,30)
    )


    elements.append(
        Paragraph(
            "Thank you for choosing AIHMS Hospital.",
            styles["Normal"]
        )
    )


    # Build PDF

    document.build(elements)


    buffer.seek(0)

    return buffer