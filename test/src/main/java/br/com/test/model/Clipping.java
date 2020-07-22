package br.com.test.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "clipping")
public class Clipping {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private LocalDate clippingDate;
	private String clippingMatter;
	private String classificationType;
	private LocalDate classifiedDate;
	private String classifiedTime;
	private Boolean important;
	private Boolean viewed;
	@ManyToOne
	@JoinColumn(nullable = false)
	private Customer customer;
	private LocalDate appointmentDueDate;
	private String appointmentDescription;
	private LocalDate appointmentCreatedAt;
	private String notificationDescription;
	private LocalDate notificationCreatedAt;
	private Boolean notificationViewed;

	public Clipping() {
	}

	public Clipping(Customer customer, LocalDate clippingDate, String clippingMatter, String classificationType,
			LocalDate classifiedDate, String classifiedTime, Boolean important, Boolean viewed) {
		super();
		this.customer = customer;
		this.clippingDate = clippingDate;
		this.clippingMatter = clippingMatter;
		this.classificationType = classificationType;
		this.classifiedDate = classifiedDate;
		this.classifiedTime = classifiedTime;
		this.important = important;
		this.viewed = viewed;
	}

	public Clipping(LocalDate clippingDate, String clippingMatter, String classificationType, LocalDate classifiedDate,
			String classifiedTime, Boolean important, Boolean viewed, Customer customer, LocalDate appointmentDueDate,
			String appointmentDescription, LocalDate appointmentCreatedAt, String notificationDescription,
			LocalDate notificationCreatedAt, Boolean notificationViewed) {
		super();
		this.clippingDate = clippingDate;
		this.clippingMatter = clippingMatter;
		this.classificationType = classificationType;
		this.classifiedDate = classifiedDate;
		this.classifiedTime = classifiedTime;
		this.important = important;
		this.viewed = viewed;
		this.customer = customer;
		this.appointmentDueDate = appointmentDueDate;
		this.appointmentDescription = appointmentDescription;
		this.appointmentCreatedAt = appointmentCreatedAt;
		this.notificationDescription = notificationDescription;
		this.notificationCreatedAt = notificationCreatedAt;
		this.notificationViewed = notificationViewed;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getClippingDate() {
		return clippingDate;
	}

	public void setClippingDate(LocalDate clippingDate) {
		this.clippingDate = clippingDate;
	}

	public String getClippingMatter() {
		return clippingMatter;
	}

	public void setClippingMatter(String clippingMatter) {
		this.clippingMatter = clippingMatter;
	}

	public String getClassificationType() {
		return classificationType;
	}

	public void setClassificationType(String classificationType) {
		this.classificationType = classificationType;
	}

	public LocalDate getClassifiedDate() {
		return classifiedDate;
	}

	public void setClassifiedDate(LocalDate classifiedDate) {
		this.classifiedDate = classifiedDate;
	}

	public String getClassifiedTime() {
		return classifiedTime;
	}

	public void setClassifiedTime(String classifiedTime) {
		this.classifiedTime = classifiedTime;
	}

	public Boolean getImportant() {
		return important;
	}

	public void setImportant(Boolean important) {
		this.important = important;
	}

	public Boolean getViewed() {
		return viewed;
	}

	public void setViewed(Boolean viewed) {
		this.viewed = viewed;
	}

	public LocalDate getAppointmentDueDate() {
		return appointmentDueDate;
	}

	public void setAppointmentDueDate(LocalDate appointmentDueDate) {
		this.appointmentDueDate = appointmentDueDate;
	}

	public String getAppointmentDescription() {
		return appointmentDescription;
	}

	public void setAppointmentDescription(String appointmentDescription) {
		this.appointmentDescription = appointmentDescription;
	}

	public LocalDate getAppointmentCreatedAt() {
		return appointmentCreatedAt;
	}

	public void setAppointmentCreatedAt(LocalDate appointmentCreatedAt) {
		this.appointmentCreatedAt = appointmentCreatedAt;
	}

	public String getNotificationDescription() {
		return notificationDescription;
	}

	public void setNotificationDescription(String notificationDescription) {
		this.notificationDescription = notificationDescription;
	}

	public LocalDate getNotificationCreatedAt() {
		return notificationCreatedAt;
	}

	public void setNotificationCreatedAt(LocalDate notificationCreatedAt) {
		this.notificationCreatedAt = notificationCreatedAt;
	}

	public Boolean getNotificationViewed() {
		return notificationViewed;
	}

	public void setNotificationViewed(Boolean notificationViewed) {
		this.notificationViewed = notificationViewed;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Clipping other = (Clipping) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Clipping [id=" + id + ", clippingDate=" + clippingDate + ", clippingMatter=" + clippingMatter
				+ ", classificationType=" + classificationType + ", classifiedDate=" + classifiedDate
				+ ", classifiedTime=" + classifiedTime + ", important=" + important + ", viewed=" + viewed
				+ ", customer=" + customer + ", appointmentDueDate=" + appointmentDueDate + ", appointmentDescription="
				+ appointmentDescription + ", appointmentCreatedAt=" + appointmentCreatedAt
				+ ", notificationDescription=" + notificationDescription + ", notificationCreatedAt="
				+ notificationCreatedAt + ", notificationViewed=" + notificationViewed + "]";
	}

}
